var failureType = require('./../../failureType')
var hasValue = require('./../../hasValue')
var parseMoment = require('./parseMoment')

var createErrorResponse = function(value) {
    return {
        message: "The value must be a date.",
        type: failureType.nonDate,
        value : value
    }
};

var validate = function(value) {
    if (hasValue(value) === false) return;

    if (parseMoment(value) === null) {
        return createErrorResponse(value);
    }
};

module.exports = {
    create : function() {
        return validate;
    }
}