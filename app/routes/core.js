'use strict';

exports.register = function(plugin, options, next) {
  let Controllers = {
    core: {
      fallback: require('../controllers/core/fallback')
    }
  };

  plugin.route([
    {
      method: '*',
      path: '/{p*}',
      config: Controllers.core.fallback.notfound
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'core_routes',
  version: require('../../package.json').version
};
