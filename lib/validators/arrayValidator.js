var failureType = require('./../failureType')
var hasValue = require('./../hasValue')

var validate = function(value) {
    if (hasValue(value) === false) {
        return;
    }

    if (Array.isArray(value)) {
        return;
    }

    return {
        message: "The value must be an array.",
        type: failureType.nonArray,
        value : value
    }
};

module.exports = {
    create : function() {
        return validate;
    }
}