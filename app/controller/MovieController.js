'use strict';

const Controller = require('egg').Controller;

class MovieController extends Controller {
  async list() {
    const params = this.ctx.request.body;
    const result = {};
    result.data = await this.ctx.service.movieService.query(params.param, params.start, params.limit);
    result.total = await this.ctx.service.movieService.count(params.param);
    this.ctx.body = result;
  }

  async get() {
    const params = this.ctx.request.body;
    this.ctx.body = await this.ctx.service.movieService.get(params ? params.id : null);
  }

  async update() {
    this.ctx.body = await this.ctx.service.movieService.update(this.ctx.request.body);
  }

  async create() {
    this.ctx.body = await this.ctx.service.movieService.create(this.ctx.request.body);
  }

  async remove() {
    await this.ctx.service.movieService.remove(this.ctx.request.body.id);
  }
}

module.exports = MovieController;
