var numericRangeValidator = require('./numericRangeValidator')
var subValidationCreator = require('./numericSubValidationCreator')
var failureType = require('./../failureType')
var hasValue = require('./../hasValue')
var isNumeric = require('./../isNumeric')
var applySubValidations = require('./../applySubValidations')

var createNonNumericFailureDescription = function(value) {
    return {
        message: "The value must be numeric.",
        type: failureType.nonNumeric,
        value : value
    };
};

var validate = function(value) {
    if (hasValue(value) == false) return;

    if (isNumeric(value) == false) {
        return createNonNumericFailureDescription(value);
    }
};

var create = function(config) {
    var subValidations = subValidationCreator(config);

    return function(value) {
        var failed = validate(value);

        var toReturn = failed ? failed : applySubValidations(subValidations, value);
        return toReturn;
    }
}

module.exports = {
    create : create
}