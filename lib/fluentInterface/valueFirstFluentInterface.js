var rulesLib = require('./../namespace.js');
var numericValidator = rulesLib.numericValidator
var populatedValidator = rulesLib.populatedValidator
var dateValidator = rulesLib.dateValidator
var stringValidator = rulesLib.stringValidator
var regularExpressionValidator = rulesLib.regularExpressionValidator
var arrayValidator = rulesLib.arrayValidator
var integerValidator = rulesLib.integerValidator

var numeric = function(config) {
    if (this.error) return;

    var validator = numericValidator.create(config);
    return this.validateAndReportFailures(validator);
}

var matchFor = function(config) {
    if (this.error) return;

    var validator = regularExpressionValidator.create(config);
    return this.validateAndReportFailures(validator);
}

var populated = function() {
    if (this.error) return;

    var validator = populatedValidator.create();
    return this.validateAndReportFailures(validator);
};

var string = function(config) {
    if (this.error) return;

    var validator = stringValidator.create(config);
    return this.validateAndReportFailures(validator);
};

var integer = function integer() {
    if (this.error) return;

    var validator = integerValidator.create();
    return this.validateAndReportFailures(validator);
};

var array = function() {
    if (this.error) return;

    var validator = arrayValidator.create();
    return this.validateAndReportFailures(validator);
};

var date = function(config) {
    if (this.error) return;

    var validator = dateValidator.create(config);
    return this.validateAndReportFailures(validator);
};

var validateAndReportFailures = function(validator) {
    var result = validator(this.valueToValidate);

    if (result) {
        this.error = result;
    }

    return this;
}

var fluentInterface = {
    populated: populated,
    matchFor: matchFor,

    numeric: numeric,
    integer: integer,
    string: string,
    date: date,
    array : array,

    validateAndReportFailures : validateAndReportFailures
}

var create = function(valueToValidate, propertyName) {
    var customProperties = {
        propertyName: { value: propertyName},
        valueToValidate : { value: valueToValidate }
    };

    return Object.create(fluentInterface, customProperties);
}

module.exports = {
    create: create
}