// See https://github.com/umdjs/umd, specifically https://github.com/umdjs/umd/blob/master/returnExports.js
umdDefine(this, 'ValidationError', [], function(message, errors) {
	var ValidationError = function(message, errors) {
        this.errors = errors;
        this.message = message;
    };

    ValidationError.prototype = new Error;

    return ValidationError;
});