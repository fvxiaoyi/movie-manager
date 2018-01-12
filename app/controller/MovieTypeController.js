'use strict';

const Controller = require('egg').Controller;

class MovieTypeController extends Controller {
  async findAll() {
    this.ctx.body = await this.ctx.service.movieTypeService.findAll();
  }
}

module.exports = MovieTypeController;
