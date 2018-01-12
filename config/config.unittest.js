'use strict';

exports.mongoose = {
  url: 'mongodb://@localhost:27017/MOVIE',
  options: {
    user: 'root',
    pass: 'root',
  },
};

exports.cluster = {
  listen: {
    port: 7001,
    hostname: '127.0.0.1',
  },
};
