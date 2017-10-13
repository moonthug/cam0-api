'use strict';

///////////////////////////////////////////////////////////////////////////////
//
//
// DEPENDENCIES
//

// Packages
const fs = require('fs');

// Libs
const mongoose = require('mongoose');

///////////////////////////////////////////////////////////////////////////////
//
//
// IMPLEMENTATION
//

/**
 *
 * @param {Server} server
 * @param {object} options
 * @param {function} next
 */
exports.register = (server, options, next) => {
  mongoose.Promise = global.Promise;

  mongoose.connect(options.uri, err => {
    if (err) {
      server.log(['error', 'mongoose'], err);
      throw err;
    }
  });

  mongoose.connection.on('connected', () => {
    server.log(['info', 'mongoose'], 'Mongo Database connected');
  });

  mongoose.connection.on('disconnected', () => {
    server.log(['error', 'mongoose'], 'Mongo Database disconnected');
  });

  // mongoose.set('debug', function (collectionName, method, query, doc) {
  //   console.log('MONGOOSE DEBUG');
  // });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      server.log(
        ['info', 'mongoose'],
        'Mongo Database disconnected through app termination'
      );
      process.exit(0);
    });
  });

  let files = fs.readdirSync('app/models');
  files.forEach(file => {
    require('../models/' + file);
  });

  server.log(
    ['info', 'mongoose'],
    `Mongoose schemas loaded: ${Object.keys(mongoose.models)}`
  );

  next();
};

/**
 *
 */
exports.register.attributes = {
  name: 'mongo',
  version: require('../../package.json').version
};
