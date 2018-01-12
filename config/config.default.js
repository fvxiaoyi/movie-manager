'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1515579923443_5879';

  // add your config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ 'http://localhost:3000' ],
  };

  config.cors = {
    allowMethods: 'GET,PUT,POST,PATCH,DELETE,HEAD,OPTIONS',
    credentials: true,
  };

  return config;
};
