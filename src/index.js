import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParseFormat from './parsers';

const parse = (filePath) => {
  const extension = path.extname(filePath);
  const rawObject = fs.readFileSync(filePath, 'utf-8');
  const makeParsedObject = getParseFormat(extension);
  const parsedObject = makeParsedObject(rawObject);
  return parsedObject;
};

const compare = (object1, object2) => {
  // 1. Get keys
  const firstObjectKeys = Object.keys(object1);
  const secondObjectKeys = Object.keys(object2);
  const allKeys = _.union(firstObjectKeys, secondObjectKeys);

  // 2. Make array of result strings
  const resultArray = allKeys.reduce((acc, key) => {
    if (!firstObjectKeys.includes(key) && secondObjectKeys.includes(key)) return [...acc, `  + ${key}: ${object2[key]}`];
    if (firstObjectKeys.includes(key) && !secondObjectKeys.includes(key)) return [...acc, `  - ${key}: ${object1[key]}`];
    if (object1[key] === object2[key]) return [...acc, `  ${key}: ${object1[key]}`];
    return [...acc, `  - ${key}: ${object1[key]}`, `  + ${key}: ${object2[key]}`];
  }, []);

  // 3. Render result
  const renderedResult = ['{', ...resultArray, '}'].join('\n');
  return renderedResult;
};

const genDiff = (filepath1, filepath2) => compare(parse(filepath1), parse(filepath2));

export default genDiff;
