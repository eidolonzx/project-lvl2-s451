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
  const resultArray = ['{'];

  // 2. Make array of result strings
  allKeys.forEach((key) => {
    if (!firstObjectKeys.includes(key) && secondObjectKeys.includes(key)) resultArray.push(`  + ${key}: ${object2[key]}`);
    else if (firstObjectKeys.includes(key) && !secondObjectKeys.includes(key)) resultArray.push(`  - ${key}: ${object1[key]}`);
    else if (object1[key] === object2[key]) resultArray.push(`  ${key}: ${object1[key]}`);
    else {
      resultArray.push(`  - ${key}: ${object1[key]}`);
      resultArray.push(`  + ${key}: ${object2[key]}`);
    }
  });
  resultArray.push('}');

  // 3. Render result
  const renderedResult = resultArray.join('\n');
  return renderedResult;
};

const genDiff = (filepath1, filepath2) => compare(parse(filepath1), parse(filepath2));

export default genDiff;
