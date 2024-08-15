#!/usr/bin/env node

import { cli } from "cleye"
import { description, version } from "../package.json"
import { markVersion } from "."

cli(
  {
    name: "version-mark",

    version,

    // Define flags/options
    flags: {
      skipPush: {
        type: Boolean,
        description: "skip pushing to git / 不向远程仓库推送 tag",
        default: "false",
      },
    },

    help: {
      description,
    },
  },
  (argv) => {
    markVersion({ skipPush: Boolean(argv.flags.skipPush) })
  },
)
