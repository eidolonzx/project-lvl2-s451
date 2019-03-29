import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParseFormat from './parsers';
import render from './render';

const parse = (filePath) => {
  const extension = path.extname(filePath);
  const rawObject = fs.readFileSync(filePath, 'utf-8');
  const makeParsedObject = getParseFormat(extension);
  const parsedObject = makeParsedObject(rawObject);
  return parsedObject;
};

const conditions = [
  {
    check: (key, object1, object2) => _.isObject(object1[key]) && _.isObject(object2[key]),
    diffType: (key, object1, object2, func) => ({
      type: 'parent',
      key,
      children: func(object1[key], object2[key]),
    }),
  },
  {
    check: (key, object1) => !_.has(object1, key),
    diffType: (key, object1, object2) => ({
      type: 'new',
      key,
      value: object2[key],
    }),
  },
  {
    check: (key, object1, object2) => !_.has(object2, key),
    diffType: (key, object1) => ({
      type: 'deleted',
      key,
      value: object1[key],
    }),
  },
  {
    check: (key, object1, object2) => object1[key] === object2[key],
    diffType: (key, object1) => ({
      type: 'unchanged',
      key,
      value: object1[key],
    }),
  },
  {
    check: (key, object1, object2) => object1[key] !== object2[key],
    diffType: (key, object1, object2) => ({
      type: 'changed',
      key,
      beforeValue: object1[key],
      afterValue: object2[key],
    }),
  },
];

const verifyKeysExistence = (key, object1, object2) => {
  const condition = conditions.find(({ check }) => check(key, object1, object2));
  return condition;
};

const makeAst = (object1, object2) => {
  const firstObjectKeys = Object.keys(object1);
  const secondObjectKeys = Object.keys(object2);
  const allKeys = _.union(firstObjectKeys, secondObjectKeys);

  const result = allKeys.reduce((acc, key) => {
    const { diffType } = verifyKeysExistence(key, object1, object2);
    return [...acc, diffType(key, object1, object2, makeAst)];
  }, []);
  return result;
};

const genDiff = (filepath1, filepath2) => {
  const object1 = parse(filepath1);
  const object2 = parse(filepath2);

  const ast = makeAst(object1, object2);
  const renderedResult = render(ast);
  return renderedResult;
};

export default genDiff;
