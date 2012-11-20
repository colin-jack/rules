var subValidationsCreator = require('./../subValidationsCreator')
var applySubValidations = require('./../applySubValidations')
var stringLengthValidator = require('./stringLengthValidator')
var failureType = require('./../../failureType')
var hasValue = require('./../../hasValue')

var createNonNumericFailureDescription = function(value) {
    return {
        message: "The value must be a string.",
        type: failureType.nonString,
        value : value
    };
};

var validate = function(value) {
    // TODO: Do I care about changing for wrapper?
    if (typeof value !== "string") {
        return createNonNumericFailureDescription(value);
    }
};

var create = function(config) {
    var subValidations = subValidationsCreator(config, [stringLengthValidator], ['minLength', 'maxLength']);

    return function stringValidator(value) {
        if (hasValue(value) === false) return;

        var failed = validate(value);

        return failed ? failed : applySubValidations(subValidations, value);
    }
}

module.exports = {
    create : create
}
