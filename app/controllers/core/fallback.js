'use strict';

///////////////////////////////////////////////////////////////////////////////
//
//
// IMPLEMENTATION
//

exports.notfound = {
  description: 'Fallback page for 404 error',
  auth: false,
  handler: (request, reply) => {
    reply({ error: true, statusCode: 404 }).code(404);
  }
};
