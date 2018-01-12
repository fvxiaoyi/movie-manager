'use strict';

const { app } = require('egg-mock/bootstrap');

describe('./test/app/service/MovieService.test.js', () => {

  it('should query result', async () => {
    // 创建 ctx
    const ctx = app.mockContext();
    // 通过 ctx 访问到 service.user
    const result = await ctx.service.movieService.query({ searchName: '赛车' });
    console.log(result);
    return result;
  });

  it('should get result by id', async () => {
    // 创建 ctx
    const ctx = app.mockContext();
    // 通过 ctx 访问到 service.user
    const result = await ctx.service.movieService.get({ _id: '5a09683798c4f02bf4410b87' });
    console.log(result);
    return result;
  });

  it('should count result', async () => {
    // 创建 ctx
    const ctx = app.mockContext();
    // 通过 ctx 访问到 service.user
    const result = await ctx.service.movieService.count();
    console.log(result);
    return result;
  });

});
