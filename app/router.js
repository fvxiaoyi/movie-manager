'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app,
    responseBody = app.middlewares.responseBody;
  router.get('/', controller.home.index);
  router.post('/movie/list', responseBody, controller.movieController.list);
  router.post('/movie/get', responseBody, controller.movieController.get);
  router.post('/type/findAll', responseBody, controller.movieTypeController.findAll);
};
