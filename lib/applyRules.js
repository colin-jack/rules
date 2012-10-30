var ValidationError = require('./ValidationError'),
    applyPropertyRule = require('./applyPropertyRule');

var getErrorsForProperty = function(property, toValidate, definition) {
    var ruleForProperty = definition[property];
    var associatedPropertyValue = toValidate !== undefined ? toValidate[property] : undefined;

    return applyPropertyRule(ruleForProperty, associatedPropertyValue, property);
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