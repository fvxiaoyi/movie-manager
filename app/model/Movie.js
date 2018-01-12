'use strict';

module.exports = app => {
  const mongoose = app.mongoose,
    Schema = mongoose.Schema;

  const MovieSchema = new Schema({
    name: [{ type: String }],
    transName: [{ type: String }],
    country: [{ type: String }],
    year: String,
    types: [{
      type: Schema.Types.ObjectId,
      ref: 'MovieType',
    }],
    language: [{ type: String }],
    imdbScore: String,
    doubanScore: String,
    time: String,
    directors: [{ type: String }],
    actors: [{ type: String }],
    profile: String,
    hrefs: [{ type: String }],
    displayImg: [{ type: Schema.Types.ObjectId }],
    createTime: { type: Date, default: Date.now },
    modifyTime: { type: Date },
    fileIndex: String,
  });

  return mongoose.model('Movie', MovieSchema, 'movies');
};
