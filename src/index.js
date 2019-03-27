import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParseFormat from './parsers';

const parse = (filePath) => {
  const extension = path.extname(filePath);
  const rawObject = fs.readFileSync(filePath, 'utf-8');
  const parser = getParseFormat(extension);
  const parsedObject = parser(rawObject);
  return parsedObject;
};

const compare = (object1, object2) => {
  // 1. Get keys
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const allKeys = _.union(keys1, keys2);
  const result = ['{'];

  // 2. Make array of result strings
  allKeys.forEach((key) => {
    if (!keys1.includes(key) && keys2.includes(key)) result.push(`  + ${key}: ${object2[key]}`);
    else if (keys1.includes(key) && !keys2.includes(key)) result.push(`  - ${key}: ${object1[key]}`);
    else if (object1[key] === object2[key]) result.push(`  ${key}: ${object1[key]}`);
    else {
      result.push(`  - ${key}: ${object1[key]}`);
      result.push(`  + ${key}: ${object2[key]}`);
    }
  });
  result.push('}');

  // 3. Render result
  return result.join('\n');
};

const gendiff = (file1, file2) => compare(parse(file1), parse(file2));

export default gendiff;
