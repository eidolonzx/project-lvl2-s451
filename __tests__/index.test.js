import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const filesForTests = [
  ['common', 'before-common.json', 'after-common.json', 'result-common.txt'],
  ['common', 'before-common.yml', 'after-common.yml', 'result-common.txt'],
  ['common', 'before-common.ini', 'after-common.ini', 'result-common.txt'],
  ['common', 'before-tree.json', 'after-tree.json', 'result-tree.txt'],
  ['plain', 'before-tree.json', 'after-tree.json', 'result-plain.txt'],
  ['json', 'before-tree.json', 'after-tree.json', 'result-json.txt'],
];

test.each(filesForTests)('genDiff(%s, %s)', (format, before, after, result) => {
  const pathToBeforeFile = path.resolve(__dirname, `__fixtures__/${before}`);
  const pathToAfterFile = path.resolve(__dirname, `__fixtures__/${after}`);
  const pathToReferenceFile = path.resolve(__dirname, `__fixtures__/${result}`);
  const reference = fs.readFileSync(pathToReferenceFile, 'utf8').trim();

  expect(genDiff(pathToBeforeFile, pathToAfterFile, format)).toEqual(reference);
});
