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
       throw new Error("The minimum length (minLength) must be a number.");
    }

    if (unsuitableConstraint(config.maxLength)) {
       throw new Error("The maximum length (maxLength) must be a number.");
    }

    if ((config.minLength !== undefined && config.maxLength !== undefined) && config.minLength >= config.maxLength) {
        throw new Error("The minimum length (minLength) must be less than maximum (maxLength).");   
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

var handles = function(config) {
    return (config.minLength !== undefined || config.maxLength !== undefined);
}

module.exports = {
    create : create,
    handles : handles
}