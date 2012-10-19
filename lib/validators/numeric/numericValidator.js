var subValidationsCreator = require('./../subValidationsCreator')
var applySubValidations = require('./../applySubValidations')
var numericRangeValidator = require('./numericRangeValidator')
var failureType = require('./../../failureType')
var hasValue = require('./../../hasValue')
var isNumeric = require('./../../isNumeric')

var validate = function(value) {
    if (hasValue(value) == false) return;

    if (isNumeric(value) == false) {
        return {
            message: "The value must be numeric.",
            type: failureType.nonNumeric,
            value : value
        }
    }
};

var create = function(config) {
    var subValidations = subValidationsCreator(config, [numericRangeValidator], ['min', 'max']);

    return function(value) {
        var failed = validate(value);

        return failed ? failed : applySubValidations(subValidations, value);
    }
}

module.exports = {
    create : create
}