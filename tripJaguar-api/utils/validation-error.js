'use strict'

const map = require('lodash/map')
const flatten = require('lodash/flatten')

function ValidationError (errors, options){
    this.message = 'validation error';
    this.errors = errors;
    this.flatten = options.flatten;
    this.status = options.status;
    this.statusText = options.statusText;
}

ValidationError.prototype = Object.create(Error.prototype);

ValidationError.prototype.toString = function () {
    return JSON.stringify(this.toJSON());
};

ValidationError.prototype.toJSON = function () {
    if (this.flatten) return flatten(map(this.errors, 'messages'));
    return {
      status: this.status,
      statusText: this.statusText,
      errors: this.errors
    };
  };
  
  module.exports = ValidationError;