'use strict';

const assert = require('assert');
const path = require('path');
const mongoose = require('mongoose');
const EventEmitter = require('events');
const awaitEvent = require('await-event');
const Grid = require('gridfs-stream');

module.exports = app => {
  const config = app.config.mongoose;

  assert(config.url, '[egg-mongoose] url is required on config');
  app.coreLogger.info('[egg-mongoose] connecting %s', config.url);

  let options = config.options;
  if (!options.useMongoClient) {
    options = Object.assign(options, { useMongoClient: true });
  }
  if (!options.authSource) {
    options = Object.assign(options, { authSource: 'admin' });
  }

  const customPromise = app.config.mongoose.customPromise;
  mongoose.Promise = customPromise ? customPromise : Promise;
  Grid.mongo = mongoose.mongo;

  mongoose.connect(config.url, config.options);

  const db = mongoose.connection;
  db.Schema = mongoose.Schema;
  app.mongoose = db;
  app.__mongoose = mongoose;

  const heartEvent = new EventEmitter();
  heartEvent.await = awaitEvent;

  db.on('error', err => {
    err.message = `[egg-mongoose]${err.message}`;
    app.coreLogger.error(err);
  });

  db.on('disconnected', () => {
    app.coreLogger.error(`[egg-mongoose] ${config.url} disconnected`);
  });

  db.on('connected', () => {
    heartEvent.emit('connected');
    app.coreLogger.info(`[egg-mongoose] ${config.url} connected successfully`);
  });

  db.on('reconnected', () => {
    app.coreLogger.info(`[egg-mongoose] ${config.url} reconnected successfully`);
  });

  db.once('open', function() {
    const gfs = Grid(db.db);
    app.gridfs = gfs;
  });

  loadModel(app);

  app.beforeStart(function* () {
    app.coreLogger.info('[egg-mongoose] starting...');
    yield heartEvent.await('connected');
    app.coreLogger.info('[egg-mongoose] start successfully and server status is ok');
  });
};

function loadModel(app) {
  const dir = path.join(app.config.baseDir, 'app/model');
  app.loader.loadToApp(dir, 'model', {
    inject: app,
    caseStyle: 'upper',
    filter(model) {
      return (model.modelName && model.base && model.base.Mongoose);
    },
  });
}
