'use strict';

const Service = require('egg').Service,
  assert = require('assert');

class MovieService extends Service {
  async query(param, start = 0, limit = 15) {
    let condition = {},
      sort = { year: -1 };
    if (param) {
      if (param.searchName) {
        const searchName = this.ctx.helper.evil(`/${param.searchName}/`);
        condition = Object.assign(condition, { $or: [{ name: searchName }, { transName: searchName }] });
      }
      if (param.sort && param.sort.prop && param.sort.order) {
        sort = {};
        sort[param.sort.prop] = param.sort.order === 'descending' ? -1 : 1;
      }
    }
    let result = await this.ctx.model.Movie.find(condition)
      .populate('types', 'name')
      .skip(start)
      .limit(limit)
      .sort(sort)
      .select({
        _id: 1,
        name: 1,
        transName: 1,
        country: 1,
        year: 1,
        types: 1,
        displayImg: 1,
      })
      .exec();
    if (result.length > 0) {
      result = result.map(m => {
        const obj = m.toObject();
        obj.id = obj._id;
        delete obj._id;
        return obj;
      });
    }
    return result;
  }

  async count(param) {
    let condition = {};
    if (param) {
      if (param.searchName) {
        const searchName = this.ctx.helper.evil(`/${param.searchName}/`);
        condition = Object.assign(condition, { $or: [{ name: searchName }, { transName: searchName }] });
      }
    }
    return await this.ctx.model.Movie.where(condition).count();
  }

  async get(_id) {
    assert(_id, '必须传入id');
    const find = await this.ctx.model.Movie.findOne({ _id })
      .select({
        fileIndex: 0,
        __v: 0,
        createTime: 0,
        modifyTime: 0,
      })
      .exec();
    if (find) {
      const obj = find.toObject();
      obj.id = obj._id;
      delete obj._id;
      return obj;
    }
    return null;
  }

}

module.exports = MovieService;
