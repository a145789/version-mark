
<h1 align="center">Version Mark</h1>

<p align="center">
  <span>English</span> | 
  <a href="https://github.com/a145789/version-mark/blob/main/README.zh-CN.md">中文</a>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/version-mark" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/npm/dm/version-mark" alt="NPM Version" /></a>
  <a href="https://github.com/a145789/version-mark/blob/main/LICENCE" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/github/license/a145789/version-mark" alt="License" /></a>
</p>

## Introduction

A version marking tool suitable for `Web` projects, offering more friendly `Git` version management for both frontend and backend projects.

## Features

- Detect changes in the working directory
  - If there are uncommitted changes, only the pre-release version option will be provided.
  - If all current changes are committed, options for both the formal version and pre-release version will be provided.
    - `patch`: `0.0.1`
    - `minor`: `0.1.0`
    - `major`: `1.0.0`
    - `prepatch`: `0.0.1-0`
    - `preminor`: `0.1.0-0`
    - `premajor`: `1.0.0-0`

- Automatically update the version number in `package.json`.
- If it's a formal version, a new git tag will be automatically created and pushed to the remote repository.

## Installation

```bash
pnpm add version-mark -D
yarn add version-mark -D
npm install version-mark -D
```

## Usage

```json
{
  "scripts": {
    "version": "vmark",
    "build": "pnpm run build && vmark"
  }
}
```

```bash
pnpm run version
yarn run build
```

### Example Output

```text
current version: v1.0.0
? Pick a version
  o v1.0.1
  o v1.1.0
  o v2.0.0
  o v1.0.1-202410121365
  o v1.1.0-202410121365
  o v2.0.0-202410121365
  o Skip
```

After the user makes a selection, the `package.json` will be updated, and for formal versions, a new git tag will be created and pushed.

## Notes

- Ensure that your `package.json` file is located in the current working directory.
- Make sure your git repository is configured with a remote repository.
