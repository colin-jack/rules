var numericValidator = require('./../validators/numeric/numericValidator')
var populatedValidator = require('./../validators/populatedValidator')
var dateValidator = require('./../validators/date/dateValidator')
var stringValidator = require('./../validators/string/stringValidator')
var regularExpressionValidator = require('./../validators/regularExpressionValidator')
var arrayValidator = require('./../validators/arrayValidator')

var numeric = function(config) {
    var validator = numericValidator.create(config);
    return this.validateAndReportFailures(validator);
}

var matchFor = function(config) {
    var validator = regularExpressionValidator.create(config);
    return this.validateAndReportFailures(validator);
}

var populated = function() {
    var validator = populatedValidator.create();
    return this.validateAndReportFailures(validator);
};

var string = function(config) {
    var validator = stringValidator.create(config);
    return this.validateAndReportFailures(validator);
};

var array = function() {
    var validator = arrayValidator.create();
    return this.validateAndReportFailures(validator);
};

var date = function(config) {
    var validator = dateValidator.create(config);
    return this.validateAndReportFailures(validator);
};

var validateAndReportFailures = function(validator) {
    var result = validator(this.valueToValidate);

    if (result) {
        this.errors.push(result);
    }

    return this;
}

var fluentInterface = {
    populated: populated,
    matchFor: matchFor,

    numeric: numeric,
    string: string,
    date: date,
    array : array,

    validateAndReportFailures : validateAndReportFailures
}

var create = function(valueToValidate, propertyName) {
    var customProperties = {
        propertyName: { value: propertyName},
        valueToValidate : { value: valueToValidate },
        errors: { value: [] }
    };

    return Object.create(fluentInterface, customProperties);
}

module.exports = {
    create: create
}