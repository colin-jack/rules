var failureType = require('./failureType')
var hasValue = require('./hasValue')

module.exports = function(value) {
    if (hasValue(value) === true) {
        return;
    }

    return {
        message: "The value must be populated.",
        type: failureType.notPopulated,
        value : value
    }
};