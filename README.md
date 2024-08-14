<h1 align="center">Version Mark</h1>

## 介绍

一个适用于 `Web` 项目的版本标记工具，对前后台项目更友好的 `Git` 版本管理。

## 功能

- 检测工作目录中的更改
  - 如果存在未提交的更改，将只提供预发布版本选项。
  - 如果当前更改都已提交，将提供正式版和预发布版本选项。
    - `patch`: `0.0.1`
    - `minor`: `0.1.0`
    - `major`: `1.0.0`
    - `prepatch`: `0.0.1-0`
    - `preminor`: `0.1.0-0`
    - `premajor`: `1.0.0-0`

- 自动更新`package.json`中的版本号。
- 如果是正式版本，将自动创建并向远程仓库推送新的git标签。

## 安装

```bash
pnpm add version-mark -D
yarn add version-mark -D
npm install version-mark -D
```

## 使用



### 示例输出

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
用户选择后，`package.json`将被更新，并且（对于正式版本）一个新的git标签将被创建和推送。

## 注意事项

- 确保您的`package.json`文件位于当前工作目录中。
- 确保您的git仓库已配置远程仓库。
