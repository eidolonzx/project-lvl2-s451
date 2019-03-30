import json from './render-json';
import plain from './render-plain';
import common from './render-common';

const renderFormats = {
  json,
  plain,
  common,
};

const getRenderer = (format = 'common') => renderFormats[format];

export default getRenderer;
