var subValidationsCreator = require('./../subValidationsCreator')
var applySubValidations = require('./../applySubValidations')
var stringLengthValidator = require('./stringLengthValidator')
var failureType = require('./../../failureType')
var hasValue = require('./../../hasValue')
var format = require('util').format;

var createNonNumericFailureDescription = function(value, property) {
    return {
        message: format("The %svalue must be a string.", property == undefined ? "" : "'" + property + "' "),
        type: failureType.nonString,
        value : value
    };
};

var validate = function(value, property) {
    // TODO: Do I care about changing for wrapper?
    if (typeof value !== "string") {
        return createNonNumericFailureDescription(value, property);
    }
};

var create = function(config) {
    var subValidations = subValidationsCreator(config, [stringLengthValidator], ['minLength', 'maxLength']);

    return function stringValidator(value, property) {
        if (hasValue(value) === false) return;

        var failed = validate(value, property);

        return failed ? failed : applySubValidations(subValidations, value);
    }
}

module.exports = {
    create : create
}
