var failureType = require('./../../failureType');
var hasValue = require('./../../hasValue');
var numericValidator = require('./numericValidator');

var format = require('util').format;

var createFailureDescription = function createFailureDescription(value, message) {
    return { message: message, type: failureType.nonInteger, value : value }
};

var validate = function validate(value, property) {
    if (~~value != value) {
        var message = format("The %svalue must be an integer.", property == undefined ? "" : "'" + property + "' ");
        return createFailureDescription(value, message)
    }
}

var create = function() {
    return function(value, property) {
        if (hasValue(value) === false) return;

        var numericValidationResult = numericValidator.create()(value, property);

        if (numericValidationResult) {
            return numericValidationResult;
        }

        return validate(value, property);
    }
}

var handles = function(config) {
    return true;
}

module.exports = {
    create : create,
    handles: handles
}