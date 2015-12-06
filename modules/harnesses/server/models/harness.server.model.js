'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Harness Schema
 */
var HarnessSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  vm_name: {
    type: String,
    default: '',
    trim: true,
    required: 'Name cannot be blank'
  },
  utrack_id: {
    type: String,
    default: '',
    trim: true
  },
  tc_build_id: {
    type: String,
    default: 'tc-id-build-01',
    trim: true
  },
  branchwebui: {
    type: String,
    default: '',
    trim: true
  },
  branchdc: {
    type: String,
    default: '',
    trim: true
  },
  branchdf: {
    type: String,
    default: '',
    trim: true
  },
  brancheval: {
    type: String,
    default: '',
    trim: true
  },
  branchref: {
    type: String,
    default: '',
    trim: true
  },
  branchdpn: {
    type: String,
    default: '',
    trim: true
  },
  owner: {
    type: String,
    default: 'ratchet',
    trim: true
  },
  harness_status: {
    type: Number,
    default: 0
  },
  expire: {
    type: Date,
    default: Date.now
  },
  need_refresh: {
    type: Boolean,
    default: 'true'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Harness', HarnessSchema);
