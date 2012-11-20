var failureType = require('./../../failureType');
var hasValue = require('./../../hasValue');
var numericValidator = require('./numericValidator');

var createFailureDescription = function createFailureDescription(value, message) {
    return { message: message, type: failureType.nonInteger, value : value }
};

var validate = function validate(value) {
    if (~~value != value) {
        return createFailureDescription(value, "The value must be an integer.")
    }
}

var create = function() {
    return function(value) {
        if (hasValue(value) === false) return;

        var numericValidationResult = numericValidator.create()(value);

        if (numericValidationResult) {
            return numericValidationResult;
        }

        return validate(value);
    }
}

var handles = function(config) {
    return true;
}

module.exports = {
    create : create,
    handles: handles
}