// @flow

///////////////////////////////////////////////////////////////////////////////
//
//
// DEPENDENCIES
//
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import config from '../../config/config';

import type { Schema } from 'mongoose';

///////////////////////////////////////////////////////////////////////////////
//
//
// SCHEMA
//

let UserSchema: Schema<*> = new mongoose.Schema({
  //
  // User Specific
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  emailAddress: {
    type: String,
    trim: true,
    select: false
  },

  //
  // Auth Specific
  token: {
    type: String,
    select: false
  },
  tokenExpiry: {
    type: Date,
    default: Date.now
  },

  //
  // Data Specific
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
UserSchema.methods.authenticate = function(token: string, cb): void {
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
 * @param {String} token
 * @param {Function} cb
 */
function hashToken(token: string, cb: func): void {
  bcrypt.hash(token, 10, (err, hash): void => {
    if (err) return cb(err);

    cb(null, hash);
  });
}

///////////////////////////////////////
//
// Register
//

mongoose.model('user', UserSchema);
