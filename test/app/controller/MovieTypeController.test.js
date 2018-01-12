'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/MovieTypeController.test.js', () => {

  it('should POST /type/findAll', () => {
    app.mockCsrf();
    return app.httpRequest()
      .post('/type/findAll')
      .set('Accept', 'application/json')
      .then(function(res) {
        console.log('yay got ' + JSON.stringify(res.body));
      });
  });

});
