'use strict';

const path = require('path');

exports.mongoose = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-mongoose'),
};

exports.security = {
  csrf: {
    ignoreJSON: true,
  },
};

exports.cors = {
  enable: true,
  package: 'egg-cors',
};
