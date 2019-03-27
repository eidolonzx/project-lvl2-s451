import yaml from 'js-yaml';
import ini from 'ini';

const getParseFormat = (extension) => {
  const formatParsers = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
    '.ini': ini.parse,
  };

  return formatParsers[extension];
};

export default getParseFormat;
