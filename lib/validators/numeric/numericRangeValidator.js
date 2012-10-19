var failureType = require('./../../failureType')
var hasValue = require('./../../hasValue')
var isNumeric = require('./../../isNumeric')

var createFailureDescription = function(value, message) {
    return { message: message, type: failureType.outsideRange, value : value }
};

var validate = function(value, min, max) {
    if (value > max) {
        return createFailureDescription(value, "The value cannot be greater than " + max + ".");
    }

    if (value < min) {
        return createFailureDescription(value, "The value cannot be less than " + min + ".");
    }
}

var unsuitableConstraint = function(constraint) {
    return constraint !== undefined && (constraint === null || isNumeric(constraint) === false);
}

var validateConfig = function(config) {
    if (unsuitableConstraint(config.min)) {
       throw new Error("The 'min' value must be a number.");
    }

    if (unsuitableConstraint(config.max)) {
       throw new Error("The 'max' value must be a number.");
    }

    if ((config.min !== undefined && config.max !== undefined) && config.min > config.max) {
        throw new Error("Min must be less than max.");   
    }
}

var create = function(config) {
    validateConfig(config);

    return function(value) {
        return validate(value, config.min, config.max);
    }
}

var handles = function(config) {
    return (config.min !== undefined || config.max !== undefined);
}

module.exports = {
    create : create,
    handles: handles
}