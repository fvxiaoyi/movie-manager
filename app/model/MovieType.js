'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const MovieTypeSchema = new mongoose.Schema({
    name: {
      type: String,
      require: true,
    },
  });
  return mongoose.model('MovieType', MovieTypeSchema, 'movietypes');
};
