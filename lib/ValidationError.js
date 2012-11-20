var ValidationError = function(message, errors) {
    this.errors = errors;
    this.message = message;
};

ValidationError.prototype = new Error();

module.exports = ValidationError;
