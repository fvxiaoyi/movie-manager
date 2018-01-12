'use strict';

const { app } = require('egg-mock/bootstrap');

describe('MovieTypeService.test.js', () => {

  it('should find all', async () => {
    // 创建 ctx
    const ctx = app.mockContext();
    // 通过 ctx 访问到 service.user
    const result = await ctx.service.movieTypeService.findAll();
    console.log(result);
    return result;
  });

});
