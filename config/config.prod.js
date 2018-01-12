'use strict';

exports.mongoose = {
  url: 'mongodb://@localhost:27017/MOVIE',
  options: {
    user: 'root',
    pass: 'root',
  },
};

exports.wechat = {
  token: 'suyibin',
};

exports.cluster = {
  listen: {
    port: 80,
    hostname: '127.0.0.1',
  },
};

exports.baseUrl = 'http://et58f5.natappfree.cc';
