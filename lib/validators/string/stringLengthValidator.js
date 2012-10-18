var failureType = require('./../../failureType')
var hasValue = require('./../../hasValue')
var isNumeric = require('./../../isNumeric')

var createFailureDescription = function(value, message) {
    return {
        message: message,
        type: failureType.outsideLengthConstraint,
        value : value
    }
};

var validate = function(value, minimum, maximum) {
    if (value.length > maximum) {
        return createFailureDescription(value, "The length cannot be greater than " + maximum + ".");
    }

    if (value.length < minimum) {
        return createFailureDescription(value, "The length cannot be less than " + minimum + ".");
    }
}

var unsuitableConstraint = function(constraint) {
    return constraint !== undefined && (constraint === null || isNumeric(constraint) === false);
}

var validateConfig = function(config) {
    if (unsuitableConstraint(config.minLength)) {
       throw new Error("Minimum must be a number.");
    }

    if (unsuitableConstraint(config.maxLength)) {
       throw new Error("Maximum must be a number.");
    }

    if ((config.minLength !== undefined && config.maxLength !== undefined) && config.minLength > config.maxLength) {
        throw new Error("Minimum must be less than maximum.");   
    }
}

var create = function(config) {
    validateConfig(config);

    return function(value) {
        // NOTE - If min/max are missing and are thus undefined we're OK as comparisons act as you'd expect
        // so any value is > and < it
        return validate(value, config.minLength, config.maxLength);
    }
}

module.exports = {
    create : create
}