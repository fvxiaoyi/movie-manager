'use strict';

const assert = require('assert');

module.exports = {
  evil(obj) {
    assert(typeof obj === 'string', '传入的必须是可以转成对象的字符串');
    const Fn = Function;
    return new Fn(`return ${obj}`)();
  },
};
