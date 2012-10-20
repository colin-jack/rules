var failureType = require('./../failureType')
var hasValue = require('./../hasValue')
var moment = require('moment')

var isSuitableType = function(value) {
    return Array.isArray(value) || typeof value === "string" || value instanceof Date;
};

var createErrorResponse = function(value) {
    return {
        message: "The value must be a date.",
        type: failureType.nonDate,
        value : value
    }
};

var validate = function(value) {
    if (hasValue(value) === false) return;

    if (isSuitableType(value) == false || moment(value).isValid() === false) {
        return createErrorResponse(value);
    }
};

module.exports = {
    create : function() {
        return validate;
    }
}