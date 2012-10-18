var failureType = require('./../../failureType')
var hasValue = require('./../../hasValue')
var isNumeric = require('./../../isNumeric')

var createFailureDescription = function(value, message) {
    return {
        message: message,
        type: failureType.outsideRange,
        value : value
    }
};

var validate = function(value, minimum, maximum) {
    if (value > maximum) {
        return createFailureDescription(value, "The value cannot be greater than " + maximum + ".");
    }

    if (value < minimum) {
        return createFailureDescription(value, "The value cannot be less than " + minimum + ".");
    }
}

var unsuitableConstraint = function(constraint) {
    return constraint !== undefined && (constraint === null || isNumeric(constraint) === false);
}

var validateConfig = function(config) {
    if (unsuitableConstraint(config.minimum)) {
       throw new Error("Minimum must be a number.");
    }

    if (unsuitableConstraint(config.maximum)) {
       throw new Error("Maximum must be a number.");
    }

    if ((config.minimum !== undefined && config.maximum !== undefined) && config.minimum > config.maximum) {
        throw new Error("Minimum must be less than maximum.");   
    }
}

var create = function(config) {
    validateConfig(config);

    return function(value) {
        return validate(value, config.minimum, config.maximum);
    }
}

module.exports = {
    create : create
}