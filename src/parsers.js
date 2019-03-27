import yaml from 'js-yaml';

const getParseFormat = (extension) => {
  const formatParsers = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
  };

  return formatParsers[extension];
};

export default getParseFormat;
