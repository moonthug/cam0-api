///////////////////////////////////////////////////////////////////////////////
//
//
// DEPENDENCIES
//

// Package

// Libs

// Internal
const config = require('./config');

///////////////////////////////////////////////////////////////////////////////
//
//
// CONFIG
//

module.exports = {
  server: {
    cache: config.server.cache,

    connections: {
      router: {
        stripTrailingSlash: true,
        isCaseSensitive: false
      },
      routes: {
        security: true,
        // validate: {
        //   failAction: relish.failAction,
        //   options: {
        //     abortEarly: false
        //   },
        // }
        cors: {
          additionalHeaders: ['Origin']
        }
      }
    },

    debug: config.server.debug
  },

  connections: [
    {
      port: config.http.port,
      tls: config.http.tls,
      labels: ['api']
    }
  ],

  registrations: [
    // good - Logging
    {
      plugin: {
        register: 'good',
        options: config.good
      }
    },

    // mongoose - DB
    {
      plugin: {
        register: './app/plugins/mongo',
        options: config.mongo
      }
    },

    // auth - API Authentiaction
    // { plugin: './app/plugins/auth' },

    // routes
    { plugin: './app/routes/core' },
    { plugin: './app/routes/api' },
    { plugin: './app/routes/home' }
  ].concat(config.registrations)
};
