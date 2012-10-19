var failureType = require('./../../failureType')
var hasValue = require('./../../hasValue')
var throwIfConfigHasUnexpectedKeys = require('./../throwIfConfigHasUnexpectedKeys')

var validate = function(value, pattern, flags) {
    if (hasValue(value) == false) return;

    var regex = pattern instanceof RegExp ? pattern : new RegExp(pattern, flags)

    if (regex.exec(value) === null) {
        return {
            message: "The value does not match the required pattern '" + pattern + "'",
            type: failureType.regexNotMatched,
            value : value
        };
    }
};

var create = function(config) {
    throwIfConfigHasUnexpectedKeys(config, ['pattern', 'flags']);

    if (config === undefined || config.pattern === undefined) {
        throw new Error("The 'pattern' value must be the Regex pattern to use.");
    }

    if (config.pattern instanceof RegExp && config.flags) {
        throw new Error('The flags cannot be used when pattern is a RegExp object.');
    }

    return function(value) {
        return validate(value, config.pattern, config.flags);
    }
}

module.exports = {
    create : create
}