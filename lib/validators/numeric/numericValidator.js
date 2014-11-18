var subValidationsCreator = require('./../subValidationsCreator')
var applySubValidations = require('./../applySubValidations')
var numericRangeValidator = require('./numericRangeValidator')
var failureType = require('./../../failureType')
var hasValue = require('./../../hasValue')
var isNumeric = require('./../../isNumeric')

var format = require('util').format;

var validate = function(value, property) {
    if (isNumeric(value) === false) {
        var message = format("The %svalue must be numeric.", property == undefined ? "" : "'" + property + "' ");

        return {
            message: message,
            type: failureType.nonNumeric,
            value : value
        }
    }
};

var create = function(config) {
    var subValidations = subValidationsCreator(config, [numericRangeValidator], ['min', 'max']);

    return function(value, property) {
        if (hasValue(value) === false) return;
        
        var failed = validate(value, property);
        return failed ? failed : applySubValidations(subValidations, value);
    }
}

module.exports = {
    create : create
}