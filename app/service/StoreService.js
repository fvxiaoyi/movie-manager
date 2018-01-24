'use strict';

const Service = require('egg').Service,
  assert = require('assert');

class StoreService extends Service {
  async gain(_id) {
    assert(_id, '必须传入图片id');
    const file = await new Promise((resolve, reject) => {
      this.app.gridfs.findOne({ _id }, (err, file) => {
        if (err) {
          reject(err);
        } else {
          resolve(file);
        }
      });
    });
    assert(file, '找不到图片');
    const readstream = this.app.gridfs.createReadStream({ _id });
    return {
      stream: readstream,
      length: file.length,
      filename: file.filename,
      id: _id,
    };
  }

}

module.exports = StoreService;
