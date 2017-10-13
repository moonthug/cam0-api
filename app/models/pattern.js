// @flow

///////////////////////////////////////////////////////////////////////////////
//
//
// DEPENDENCIES
//

import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import type { Schema } from 'mongoose';
import type { Pattern } from 'cam0-typedefs';

///////////////////////////////////////////////////////////////////////////////
//
//
// SCHEMA
//

let PatternSchema: Schema<Pattern> = new mongoose.Schema({
  dateLastSignedIn: {
    type: Date,
    default: Date.now,
    select: false
  },
  dateUpdated: {
    type: Date,
    default: Date.now,
    select: false
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    select: false
  }
});

///////////////////////////////////////
//
// Virtual Fields
//

///////////////////////////////////////
//
// Hooks
//

///////////////////////////////////////
//
// Methods
//

/**
 *
 * @param {String} token
 * @param {Function} cb
 */
PatternSchema.methods.authenticate = function(token: string, cb: func): void {
  bcrypt.compare(token, this.token, cb);
};

///////////////////////////////////////
//
// Statics
//

///////////////////////////////////////
//
// Private Functions
//

/**
 *
 * @param {string} token
 * @param {func} cb
 */
function hashToken(token: string, cb: func): void {
  bcrypt.hash(token, 10, (err: ?Error, hash: string): void => {
    if (err) return cb(err);

    cb(null, hash);
  });
}

///////////////////////////////////////
//
// Register
//

mongoose.model('pattern', PatternSchema);
