'use strict';

///////////////////////////////////////////////////////////////////////////////
//
//
// DEPENDENCIES
//

// Libraries
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
  let UserModel = mongoose.model('user');

  server.auth.strategy('token', 'bearer-access-token', {
    allowQueryToken: true,
    allowMultipleHeaders: false,
    accessTokenName: 'auth_token',
    validateFunc: function(token, cb) {
      UserModel.findByToken(token, (err, doc) => {
        if (err) return cb(err);

        if (doc) {
          return cb(null, true, { token: token }, { userModel: doc });
        } else {
          return cb(null, false, { token: token });
        }
      });
    }
  });

  return next();
};

/**
 *
 */
exports.register.attributes = {
  name: 'auth',
  dependencies: ['mongo', 'hapi-auth-bearer-token']
};
