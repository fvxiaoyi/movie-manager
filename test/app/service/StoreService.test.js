'use strict';

const { app } = require('egg-mock/bootstrap');

describe('./test/app/service/StoreService.test.js', () => {

  it('should write file to D:/test/', async () => {
    // 创建 ctx
    const ctx = app.mockContext();
    // 通过 ctx 访问到 service.user
    await ctx.service.storeService.gain('5a09683898c4f02bf4410be0');

    // return result;
  });

});
