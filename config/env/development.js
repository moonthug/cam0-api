///////////////////////////////////////////////////////////////////////////////
//
//
// DEPENDENCIES
//

// Packages
const fs = require('fs'),
  path = require('path');

///////////////////////////////////////////////////////////////////////////////
//
//
// CONFIG
//

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  //
  // APP

  app: {
    secret: ''
  },

  //
  // SERVER CONFIG

  server: {
    cache: {
      name: 'redis-cache',
      engine: require('catbox-redis'), //catbox-memory
      host: '127.0.0.1',
      partition: 'cam0_cache'
    },
    debug: {
      request: ['error']
    }
  },

  http: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 4444,
    tls: null
  },

  //
  // PLUGINS OPTIONS

  mongo: {
    uri: 'mongodb://localhost/cam0',
    options: {}
  },

  good: {
    reporters: {
      console: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [
            {
              log: '*',
              ops: '*',
              response: '*'
            }
          ]
        },
        {
          module: 'good-console'
        },
        'stdout'
      ]
    }
  },

  //
  // ENVIRONMENT SPECIFIC PLUGINS

  registrations: [
    // {
    //   plugin: {
    //     register: 'hapi-cors',
    //     options: {
    //       origins: ['*'],
    //       allowCredentials: 'true',
    //       exposeHeaders: ['content-type', 'content-length', 'origin'],
    //       maxAge: 600,
    //       methods: ['POST, GET, PUT, OPTIONS'],
    //       headers: ['Accept', 'Content-Type', 'Authorization', 'X-Requested-With', 'DNT', 'Origin']
    //     }
    //   }
    // }
  ]
};
