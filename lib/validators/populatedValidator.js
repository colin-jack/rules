var failureType = require('./../failureType')
var hasValue = require('./../hasValue')

var validate = function(value) {
    if (hasValue(value) === true) {
        return;
    }

    return {
        message: "The value must be populated.",
        type: failureType.notPopulated,
        value : value
    }
};

var create = function() {
    return validate;
}

module.exports = {
    create : create
}