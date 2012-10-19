var failureType = require('./../../failureType')
var hasValue = require('./../../hasValue')

var validate = function(value) {
    if (hasValue(value) == false) return;

    if (isNumeric(value) == false) {
        return {
            message: "The value does not match the required pattern.",
            type: failureType.regexNotMatched,
            value : value
        };
    }
};

var create = function(config) {
    if (config === undefined || config.pattern === undefined) {
        throw new Error("The 'pattern' value must be the Regex pattern to use.");
    }

    return function(value, config.pattern) {
        return validate(value);
    }
}

module.exports = {
    create : create
}