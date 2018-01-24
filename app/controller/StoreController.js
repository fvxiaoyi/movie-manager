'use strict';

const Controller = require('egg').Controller,
  PassThrough = require('stream').PassThrough;

class StoreController extends Controller {
  async gain() {
    try {
      const file = await this.ctx.service.storeService.gain(this.ctx.params.id);
      let filename = encodeURIComponent(file.filename)
      this.ctx.set('Content-Type', 'image/jpeg;charset=UTF-8');
      this.ctx.set('Content-Disposition', `inline;filename=${filename}`);
      this.ctx.set('Content-Length', file.length);
      this.ctx.body = file.stream.on('error', this.ctx.onerror).pipe(PassThrough());
    } catch (e) {
      console.error(e)
      this.ctx.redirect('/public/noimg.jpg');
    }
  }

  async upload() {
    // TODO 上传到临时文件(整个文件保存结构思考)
    const stream = await this.ctx.getFileStream();
    if(stream) {
      let writestream = this.app.gridfs.createWriteStream({
        filename : stream.filename
      })
      let file = await new Promise((resolve,reject) => {
        stream.pipe(writestream)
        writestream.on('close', function (file) {
          resolve(file)
        })
      })
      this.ctx.body = { id: file._id}
    }
    
  }

}

module.exports = StoreController;
