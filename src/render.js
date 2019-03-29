import _ from 'lodash';

const calculateTabs = depth => ' '.repeat(2 * depth);

const makeString = (object, depth) => {
  if (!(object instanceof Object)) return object;
  const openingTab = calculateTabs(depth + 1);
  const closingTab = calculateTabs(depth);
  return `{\n${[...Object.keys(object)].map(key => `${openingTab}${key}: ${object[key]}`)}\n${closingTab}}`;
};

const render = (ast) => {
  const iter = (data, depth = 1) => data.map((object) => {
    const tab = calculateTabs(depth);
    if (object.type === 'new') return `${tab}+ ${object.key}: ${makeString(object.value, depth)}`;
    if (object.type === 'deleted') return `${tab}- ${object.key}: ${makeString(object.value, depth)}`;
    if (object.type === 'changed') return [`${tab}- ${object.key}: ${makeString(object.beforeValue, depth)}`, `${tab}+ ${object.key}: ${makeString(object.afterValue, depth)}`];
    if (object.type === 'unchanged') return `${tab}${object.key}: ${makeString(object.value, depth)}`;
    if (object.type === 'parent') return `${tab}${object.key}: {\n${_.flatten(iter(object.children, depth + 1)).join('\n')}\n${tab}}`;
    return console.log('Invalid node in AST!!!');
  });
  return `{\n${(_.flatten(iter(ast))).join('\n')}\n}`;
};

export default render;
