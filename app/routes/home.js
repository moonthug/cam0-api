'use strict';

exports.register = function(plugin, options, next) {
  let Controllers = {
    home: {
      index: require('../controllers/home/index')
    }
  };

  plugin.route([
    {
      method: 'GET',
      path: '/',
      config: Controllers.home.index
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'home_routes',
  version: require('../../package.json').version
};
