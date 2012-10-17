var numericValidator = require('./numeric/numericValidator')
var populatedValidator = require('./populatedValidator')

var numeric = function(config) {
    var validator = numericValidator.create(config);
    validateAndReportAnyFailures(validator, this);
    return this;
}

var populated = function() {
    var validator = populatedValidator.create();
    validateAndReportAnyFailures(validator, this);
    return this;
};

var validateAndReportAnyFailures = function(validator, context) {
    var result = validator(context.valueToValidate);

    if (result) {
        context.errors.push(result);
    }
}

var fluentInterface = {
    populated: populated,
    numeric : numeric,
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