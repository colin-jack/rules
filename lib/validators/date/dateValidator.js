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

var canBeParsedAsMoment = function(toParse) {
    if (moment.isMoment(toParse)) return true;
    if (isSuitableType(toParse) === false) return false;

    var parsed = moment(toParse);

    return parsed.isValid();
}

var validate = function(value) {
    if (hasValue(value) === false) return;

    if (canBeParsedAsMoment(value) === false) {
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