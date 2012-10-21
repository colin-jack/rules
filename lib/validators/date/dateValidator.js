var failureType = require('./../../failureType')
var subValidationsCreator = require('./../subValidationsCreator')
var applySubValidations = require('./../applySubValidations')
var hasValue = require('./../../hasValue')
var dateRangeValidator = require('./dateRangeValidator')
var moment = require('moment')

var createErrorResponse = function(value) {
    return {
        message: "The value must be a date.",
        type: failureType.nonDate,
        value : value
    }
};

var isSuitableType = function(toParse) {
    return Array.isArray(toParse) || typeof toParse === "string" || toParse instanceof Date;
};

var parseMoment = function(toParse) {
    if (isSuitableType(toParse) === false) return null;

    var parsed = moment(toParse);

    return parsed.isValid() ? parsed : null;
}

var validate = function(value) {
    if (hasValue(value) === false) return;

    if (parseMoment(value) === null) {
        return createErrorResponse(value);
    }
};

module.exports = {
    create : function(config) {
        var subValidations = subValidationsCreator(config, [dateRangeValidator], ['before', 'after']);

        return function(value) {
            var failed = validate(value);
            return failed ? failed : applySubValidations(subValidations, value);
        }
    }
}