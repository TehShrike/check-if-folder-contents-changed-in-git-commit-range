const sh = require(`shell-tag`)
const minimatch = require(`minimatch`)

const defaultGlobOptions = Object.freeze({
	dot: true,
})
const rangeRegex = /(?:^|\/)([a-z0-9]+)\.\.\.([a-z0-9]+)$/

module.exports = function folderContentsChangedInGitCommitRange(globPattern, rangeString, globOptions = defaultGlobOptions) {
	const rangeMatch = rangeString.match(rangeRegex)
	if (!rangeMatch) {
		throw new Error(`Invalid range`)
	}

	const [ , gitStartHash, gitEndHash ] = rangeMatch

	const gitDiffOutput = sh`git diff --name-only ${ gitStartHash } ${ gitEndHash }`

	const pathMatchesGlob = minimatch.filter(globPattern, globOptions)

	return gitDiffOutput.split(`\n`).some(pathMatchesGlob)
}
