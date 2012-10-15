var failureType = require('./failureType')

module.exports = function(value) {
    if (value) {
        return;
    }

    return {
        message: "The value must be populated.",
        type: failureType.notPopulated,
        value : value
    }
};