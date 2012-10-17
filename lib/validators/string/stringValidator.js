var failureType = require('./../../failureType')
var hasValue = require('./../../hasValue')
var applySubValidations = require('./../applySubValidations')

var createNonNumericFailureDescription = function(value) {
    return {
        message: "The value must be a string.",
        type: failureType.nonString,
        value : value
    };
};

var validate = function(value) {
    if (hasValue(value) == false) return;

    debugger;

    // TODO: Do I care about changing for wrapper?
    if (typeof value !== "string") {
        return createNonNumericFailureDescription(value);
    }
};

var create = function(config) {
    //var subValidations = subValidationCreator(config);

    return function stringValidator(value) {
        var failed = validate(value);

        //var toReturn = failed ? failed : applySubValidations(subValidations, value);
        return failed;
    }
}

module.exports = {
    create : create
}
