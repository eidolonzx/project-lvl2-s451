import json from './render-json';
import plain from './render-plain';

const renderFormats = {
  json,
  plain,
};

const getRenderer = (format = 'json') => renderFormats[format];

export default getRenderer;
