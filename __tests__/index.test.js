import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const filesForTests = [
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
];

test.each(filesForTests)('genDiff(%s, %s)', (before, after) => {
  const pathToBeforeFile = path.resolve(__dirname, `__fixtures__/${before}`);
  const pathToAfterFile = path.resolve(__dirname, `__fixtures__/${after}`);
  const pathToReferenceFile = path.resolve(__dirname, '__fixtures__/result.txt');
  const reference = fs.readFileSync(pathToReferenceFile, 'utf8').trim();

  expect(genDiff(pathToBeforeFile, pathToAfterFile)).toEqual(reference);
});
