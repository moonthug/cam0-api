'use strict';

///////////////////////////////////////////////////////////////////////////////
//
//
// IMPLEMENTATION
//

exports.register = function(plugin, options, next) {
  let Controllers = {
    api: {
      index: require('../controllers/api/index')
      // user: require('../controllers/api/user')
    }
  };

  plugin.route([
    ///////////////////////////////////
    //
    // INDEX
    //

    {
      method: 'GET',
      path: '/api',
      config: Controllers.api.index.getIndex
    }

    ///////////////////////////////////
    //
    // USER
    //

    // {
    //   method: 'GET',
    //   path: '/api/user',
    //   config: Controllers.api.user.getUser
    // },
    // {
    //   method: 'GET',
    //   path: '/api/user/{id}',
    //   config: Controllers.api.user.getUserById
    // },
    // {
    //   method: 'POST',
    //   path: '/api/user',
    //   config: Controllers.api.user.postUser
    // },
  ]);

  next();
};

exports.register.attributes = {
  name: 'api_routes',
  version: require('../../package.json').version
};
