var numericRangeValidator = require('./numericRangeValidator')
var failureType = require('./failureType')
var subValidationCreator = require('./subValidationCreator')
var hasValue = require('./hasValue')
var isNumeric = require('./isNumeric')

var createNonNumericFailureDescription = function(value) {
    return {
        message: "The value must be numeric.",
        type: failureType.notNumeric,
        value : value
    };
};

var validate = function(value) {
    if (hasValue(value) == false) return;

    if (isNumeric(value) == false) {
        return createNonNumericFailureDescription(value);
    }
};

var applySubValidations = function(subValidations, value) {
    if (!subValidations) return;
    
    for (var i = 0, len = subValidations.length; i < subValidations.length; i++) {
        var subValidator = subValidations[i];
        var result = subValidator(value);

        if (result) return result;
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