'use strict';

module.exports = async (ctx, next) => {
  try {
    await next();
    const resp = ctx.body;
    ctx.body = {
      success: true,
      msg: '操作成功',
    };
    if (resp.total) {
      ctx.body.total = resp.total;
      ctx.body.data = resp.data;
    } else {
      ctx.body.data = resp;
    }
  } catch (e) {
    ctx.body = {
      success: false,
      msg: e.message,
    };
  }
};
