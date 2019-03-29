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
    const commonResultString = makeString(object.value, depth);
    switch (object.type) {
      case 'new':
        return `${tab}+ ${object.key}: ${commonResultString}`;
      case 'deleted':
        return `${tab}- ${object.key}: ${commonResultString}`;
      case 'changed':
        return [`${tab}- ${object.key}: ${makeString(object.beforeValue, depth)}`, `${tab}+ ${object.key}: ${makeString(object.afterValue, depth)}`];
      case 'unchanged':
        return `${tab}${object.key}: ${commonResultString}`;
      default:
        return `${tab}${object.key}: {\n${_.flatten(iter(object.children, depth + 1)).join('\n')}\n${tab}}`;
    }
  });
  return `{\n${(_.flatten(iter(ast))).join('\n')}\n}`;
};

export default render;
