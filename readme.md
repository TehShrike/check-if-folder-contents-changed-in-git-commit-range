# check-if-folder-contents-changed-in-git-commit-range

In the current working directory, tells you if any matching files have changed between two commits.

Useable from node or the command-line.

Accepts github range URLs, so you can use [`CIRCLE_COMPARE_URL`](https://circleci.com/docs/2.0/env-vars/#built-in-environment-variables):

```sh
check-if-folder-contents-changed-in-git-commit-range some-folder/**/*.js $CIRCLE_COMPARE_URL
# exit code 0 if any matches are found, 1 if there are no matches
```

# CLI

You can install with `npm i -g check-if-folder-contents-changed-in-git-commit-range`.

When you install from npm, it is aliased to `cifccigcr` and `folder-contents-changed-in-git-commit-range` for usability.

Takes two unnamed arguments: a glob pattern, and a git commit range.

```sh
cifccigcr test-fixture/*.txt ce31bd9...3a891ef6
```

The git commit range can be either a Github comparison url, like `https://github.com/TehShrike/check-if-folder-contents-changed-in-git-commit-range/compare/ce31bd9...3a891ef6`, or just two hashes separated by three periods, like `ce31bd9...3a891ef6`.

The glob pattern is parsed with [minimatch](https://github.com/isaacs/minimatch).

Any other named arguments that are passed in are passed to minimatch.  ([mri](https://github.com/lukeed/mri) is used for cli argument parsing.)

# node

This module exports a single function that returns `true` if any files matching the glob were changed in the commit range, `false` otherwise.

## `folderContentsChanged(globPattern, gitRangeString[, globOptions])`

```js
const folderContentsChanged = require('check-if-folder-contents-changed-in-git-commit-range')
const globPattern = `test-fixture/**/*.txt`
const gitRangeString = `ce31bd9...3a891ef6`
const fileChanged = folderContentsChanged(globPattern, gitRangeString)
```

As with the CLI version, the git range string may be a Github comparison URL.

# License

[WTFPL](http://wtfpl2.com)
