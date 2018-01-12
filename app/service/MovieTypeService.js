'use strict';

const Service = require('egg').Service;

class MovieTypeService extends Service {
  async findAll() {
    let result = await this.ctx.model.MovieType.find({})
      .select({
        _id: 1,
        name: 1,
      })
      .exec();
    if (result) {
      result = result.map(m => {
        const obj = m.toObject();
        obj.id = obj._id;
        delete obj._id;
        return obj;
      });
    }
    return result;
  }
}

module.exports = MovieTypeService;
