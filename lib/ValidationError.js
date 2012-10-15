// See https://github.com/umdjs/umd, specifically https://github.com/umdjs/umd/blob/master/returnExports.js
var ValidationError = function(message, errors) {
    this.errors = errors;
    this.message = message;
};

ValidationError.prototype = new Error;

module.exports = ValidationError;
