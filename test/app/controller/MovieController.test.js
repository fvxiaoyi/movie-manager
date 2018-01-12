'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/MovieController.test.js', () => {

  it('should POST /movie/list', () => {
    app.mockCsrf();
    return app.httpRequest()
      .post('/movie/list')
      .send({ start: 0, limit: 15 })
      .set('Accept', 'application/json')
      .then(function(res) {
        console.log('yay got ' + JSON.stringify(res.body));
      });
  });

  it('should POST /movie/get', () => {
    app.mockCsrf();
    return app.httpRequest()
      .post('/movie/get')
      .send({ id: '5a09683798c4f02bf4410b87' })
      .set('Accept', 'application/json')
      .then(function(res) {
        console.log('yay got ' + JSON.stringify(res.body));
      });
  });

});
