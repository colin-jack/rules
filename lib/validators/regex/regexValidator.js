var failureType = require('./../../failureType')
var hasValue = require('./../../hasValue')

var validate = function(value, pattern, flags) {
    if (hasValue(value) == false) return;

    var regex = new RegExp(pattern, flags)

    if (regex.exec(value) === null) {
        return {
            message: "The value does not match the required pattern '" + pattern + "'",
            type: failureType.regexNotMatched,
            value : value
        };
    }
};

var create = function(config) {
    if (config === undefined || config.pattern === undefined) {
        throw new Error("The 'pattern' value must be the Regex pattern to use.");
    }

    return function(value) {
        return validate(value, config.pattern, config.flags);
    }
}

module.exports = {
    create : create
}