'use strict';

///////////////////////////////////////////////////////////////////////////////
//
//
// MONITORING
//

// require('pmx').init({
//   http : true
// });

///////////////////////////////////////////////////////////////////////////////
//
//
// DEPENDENCIES
//

// Libs
const Glue = require('glue'),
  argv = require('minimist')(process.argv.slice(2));

// Internal
const manifest = require('./config/manifest');

///////////////////////////////////////////////////////////////////////////////
//
//
// IMPLEMENTATION
//

let options = {
  relativeTo: __dirname
};

Glue.compose(manifest, options, (err, server) => {
  if (err) throw err;

  server.start(() => {
    server.log(['info', 'server'], 'Server started');
  });
});
