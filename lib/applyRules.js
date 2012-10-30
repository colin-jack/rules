var ValidationError = require('./ValidationError'),
    applyPropertyValidator = require('./applyPropertyValidator');

var getErrorsForProperty = function(property, toValidate, definition) {
    var rulesForProperty = definition[property];
    var associatedPropertyValue = toValidate !== undefined ? toValidate[property] : undefined;

    return applyPropertyValidator(rulesForProperty, associatedPropertyValue, property);
}

var applyRules = function(toValidate, definition) {
    var result;

    for(var property in definition) if (definition.hasOwnProperty(property)) {
        var errorForProperty = getErrorsForProperty(property, toValidate, definition);

        if (errorForProperty !== undefined) {
            result = result || {};
            result[property] = errorForProperty;
        }
    }

    return result;
}

module.exports = applyRules;