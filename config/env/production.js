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

module.exports = {
  //
  // APP

  app: {
    secret: ''
  },

  //
  // SERVER CONFIG

  server: {
    debug: null
  },

  http: {
    host: '0.0.0.0',
    port: 3000
    // tls: {
    //   key: fs.readFileSync(path.join(__dirname, '..', '..', 'docs', 'certs', 'server.key')),
    //   cert: fs.readFileSync(path.join(__dirname, '..', '..', 'docs', 'certs', 'server.crt'))
    // },
  },

  //
  // PLUGINS OPTIONS

  good: {
    ops: {
      interval: 60000
    },
    reporters: {
      console: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [
            {
              log: '*',
              response: '*'
            }
          ]
        },
        {
          module: 'good-console'
        },
        'stdout'
      ],
      file: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [
            {
              ops: '*'
            }
          ]
        },
        {
          module: 'good-squeeze',
          name: 'SafeJson'
        },
        {
          module: 'good-file',
          args: ['./logs/server.log']
        }
      ]
    }
  }
};
