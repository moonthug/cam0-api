///////////////////////////////////////////////////////////////////////////////
//
//
// DEPENDENCIES
//

// Packages

// Libs
const boom = require('boom');

// Internal
const apiHelper = require('./api');

///////////////////////////////////////////////////////////////////////////////
//
//
// IMPLEMENTATION
//

/**
 *
 * @param {Request} request
 * @param {function} reply
 * @param {Object} source
 * @param {error} error
 * @returns {*}
 */
function failAction(request, reply, source, error) {
  let errors = {};

  // Only 1 error per field
  error.data.details.forEach(function(detail) {
    if (!errors[detail.path])
      errors[detail.path] = {
        path: detail.path,
        message: detail.message,
        type: detail.type
      };
  });

  return reply(
    apiHelper.formatApiErrorResponse('Form contains invalid data', 400, errors)
  );
}

///////////////////////////////////////////////////////////////////////////////
//
//
// EXPORTS
//

module.exports = {
  failAction
};
