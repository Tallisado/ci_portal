'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;



// NOTE : While nice for development, it is recommended this behavior be disabled in
 // production since index creation can cause a significant performance impact. Disable the behavior
 // by setting the autoIndex option of your schema to false, or globally on the connection by
 // setting the option config.autoIndex to false.
/**
 * Vm Schema
 */
var VmSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  expire: {
    type: Date,
    default: null
  },
  vm_name: {
    type: String,
    default: '',
    trim: true
  },
  fqdn: {
    type: String
  },
  ip: {
    type: String
  },
  loaded: {
    type: Boolean,
    default: false
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});
VmSchema.index({"expire": 1}, {expireAfterSeconds: 1}); // NOTE 24H
mongoose.model('Vm', VmSchema);
