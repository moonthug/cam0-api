'use strict';

///////////////////////////////////////////////////////////////////////////////
//
//
// DEPENDENCIES
//

// Libs
const boom = require('boom');

///////////////////////////////////////////////////////////////////////////////
//
//
// IMPLEMENTATION
//

/**
 *
 * @param data
 * @param cache
 * @param statusCode
 * @returns {{success: boolean, statusCode: number}}
 */
function formatApiSuccessResponse(data, { cache = null, statusCode = 200 }) {
  let response = {
    success: true,
    statusCode: statusCode
  };

  if (data) {
    response.payload = data;
  }

  if (cache) {
    let cacheObj = {};

    cacheObj.isCached = !!cache.stored;

    if (cacheObj.isCached) {
      cacheObj.stored = cache.stored;
      cacheObj.ttl = cache.ttl;
      cacheObj.time = cache.msec + 'ms';
    }

    response.cache = cacheObj;
  }

  return response;
}

/**
 *
 * @param {Error|String} error
 * @param {Number} statusCode
 * @param {Object=} data
 * @returns {Object}
 */
function formatApiErrorResponse(error, { data = null, statusCode = 500 } = {}) {
  let errorText = error;

  if (error.isBoom) return error;

  let boomResponse =
    error instanceof Error
      ? boom.wrap(error, statusCode)
      : boom.create(statusCode, errorText);
  boomResponse.output.payload.success = false;

  if (data) boomResponse.output.payload.payload = data;

  return boomResponse;
}

/**
 *
 * @param {String} field
 * @param {String} message
 * @param {Number=500} statusCode
 * @returns {Object}
 */
function formatApiValidationErrorResponse(
  field,
  message,
  { statusCode = 500 } = {}
) {
  let payload = {
    path: field,
    message: message,
    type: 'validation.custom'
  };

  let data = {};
  data[field] = payload;

  return formatApiErrorResponse('Validation failed', statusCode, data);
}

///////////////////////////////////////////////////////////////////////////////
//
//
// EXPORTS
//

module.exports = {
  formatApiSuccessResponse,
  formatApiErrorResponse,
  formatApiValidationErrorResponse
};
