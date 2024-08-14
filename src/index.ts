import fse from "fs-extra"
import { resolve } from "node:path"
import { type ReleaseType, valid, inc } from "semver"
import { logger } from "rslog"
import { execa } from "execa"
import { select, intro, cancel, spinner, outro, isCancel } from "@clack/prompts"
import pc from "picocolors"

const CWD = process.cwd()

const timestampToTime = () => {
  const date = new Date(Date.now())
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${year}${month}${day}${hour}${minute}${second}`
}

async function hasChangesInWorktree() {
  const ret = await execa("git", ["status", "--porcelain"])

  return Boolean(ret.stdout)
}

const releaseTypes = [
  "patch",
  "minor",
  "major",
  "prepatch",
  "preminor",
  "premajor",
] as ReleaseType[]

export interface MarkVersionOptions {
  skipPush?: boolean
}

export async function markVersion(options: MarkVersionOptions) {
  const { skipPush } = options

  const packageJson = fse.readJSONSync(resolve(CWD, "package.json"))

  const currentVersion: string = packageJson.version

  if (!valid(currentVersion)) {
    logger.error(
      `version ${currentVersion} is not valid, please follow the format x.x.x`,
    )
    process.exit(1)
  }

  intro(`${pc.gray("current version:")} ${pc.green(`v${currentVersion}`)}`)

  let selectOptions: {
    value: string
    label: string
    hint?: string
  }[] = []
  const isPre = await hasChangesInWorktree()

  if (isPre) {
    const version =
      inc(currentVersion, "prerelease", `pre.${timestampToTime()}`, false) ??
      currentVersion
    selectOptions = [{ value: version, label: `v${version}` }]
  } else {
    for (const type of releaseTypes) {
      const time = timestampToTime()
      const version =
        inc(currentVersion, type, `pre.${time}`, false) ?? currentVersion

      selectOptions.push({ value: version, label: `v${version}` })
    }
    selectOptions.push({ value: "skip", label: "Skip", hint: "Skip this step" })
  }

  const newVersion = (await select({
    message: "Pick a version",
    options: selectOptions,
  })) as string

  if (isCancel(newVersion)) {
    cancel("Cancel")
    return
  }

  if (newVersion === "skip") {
    cancel("Skip mark version")
    return
  }

  packageJson.version = newVersion
  fse.writeJSONSync(resolve(CWD, "package.json"), packageJson, { spaces: 2 })

  if (isPre) {
    outro(`new version ${pc.green(newVersion)}`)
    return
  }

  const s = spinner()
  s.start("push git tag...")
  await execa("git", ["add", "."])
  await execa("git", ["commit", "-m", `v${newVersion}`])

  await execa("git", ["tag", `v${newVersion}`])
  if (!skipPush) {
    await execa("git", ["push", "origin", `v${newVersion}`])
  }

  s.stop(`new version ${pc.green(newVersion)}`)
}
