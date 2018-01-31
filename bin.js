#!/usr/bin/env node

const folderContentsChangedInGitCommitRange = require(`./index.js`)

const mri = require(`mri`)

const options = mri(process.argv.slice(2))

const [ globPattern, gitRange ] = options._

const contentsChanged = folderContentsChangedInGitCommitRange(globPattern, gitRange, options)

const returnCode = contentsChanged ? 0 : 1

process.exit(returnCode)
