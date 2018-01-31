const test = require(`tape`)
const contentsChanged = require(`./index.js`)

/*
start ce31bd9034403ce1fcc5c45cf1748fdbda0f7eeb
test-fixture/file1.txt	df754147061dbc46cebff2f7abbeebfbc46e52e4
test-fixture/one/file2.txt	3a891ef6deb891df4bccb4df178c4026bbd198b4
test-fixture/two/file3.md	0d6e6886307d0b01f94acf2cc38df39fb8208c53
*/

const shouldReturnFalse = [
	[ `test-fixture/**/*2.txt`, `ce31bd9...df75414706` ],
	[ `test-fixture/*.txt`, `3a891ef6d...0d6e6886307d` ],
]

const shouldReturnTrue = [
	[ `test-fixture/**/*2.txt`, `ce31bd9...3a891ef6` ],
	[ `test-fixture/*.txt`, `ce31bd9...3a891ef6` ],
	[ `test-fixture/*.txt`, `ce31bd9...3a891ef6` ],
	[ `test-fixture/*.txt`, `https://github.com/Username/repo-name/compare/ce31bd9...3a891ef6` ],
]

const shouldThrow = [
	[ null, `https://github.com/Username/repo-name/compare/ce31bd9...3a891ef6` ],
	[ `**/*.txt`, `...3a891ef6` ],
	[ `**/*.txt`, `ce31bd9..3a891ef6` ],
]

test(`All simple test cases`, t => {
	shouldReturnFalse.forEach(([ glob, range ]) => {
		t.equal(false, contentsChanged(glob, range), `No matches for ${ glob } in ${ range }`)
	})

	shouldReturnTrue.forEach(([ glob, range ]) => {
		t.equal(true, contentsChanged(glob, range), `Matches for ${ glob } in ${ range }`)
	})

	shouldThrow.forEach(([ glob, range ]) => {
		t.throws(() => {
			contentsChanged(glob, range)
		})
	})

	t.end()
})
