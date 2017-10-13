///////////////////////////////////////////////////////////////////////////////
//
//
// DEPENDENCIES
//

// Packages

// Libs
const hoek = require('hoek');

// Internal
const development = require('./env/development'),
  production = require('./env/production');

///////////////////////////////////////////////////////////////////////////////
//
//
// CONFIG
//

// Shared config
const config = {
  app: {
    // passportSecret: 'd06x7bltcsCOZNFOeGq9'
  }
};

///////////////////////////////////////////////////////////////////////////////
//
//
// EXPORTS
//

module.exports =
  process.env.NODE_ENV === 'production'
    ? hoek.applyToDefaults(
        config,
        hoek.applyToDefaults(development, production)
      )
    : hoek.applyToDefaults(config, development);
