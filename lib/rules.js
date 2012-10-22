var ValidationError = require('./ValidationError')
var valueFirstFluentInterface = require('./fluentInterface/valueFirstFluentInterface')

var getErrorsForProperty = function(property, toValidate, definition) {
    var definitionForProperty = definition[property];
    var associatedPropertyValue = toValidate[property];

    return createPropertyValidator(definitionForProperty, associatedPropertyValue, property);
}

var callValidationFunction = function(definitionForProperty, associatedPropertyValue, property) {
    // The function will be passed an object that holds the fluent interface that can be used,
    // it will track errors as they happen.
    var context = valueFirstFluentInterface.create(associatedPropertyValue, property);

    definitionForProperty.call(context);

    return context.errors;
};

var createPropertyValidator = function(definitionForProperty, associatedPropertyValue, property) {
    if (typeof definitionForProperty === 'function') {
        return callValidationFunction(definitionForProperty, associatedPropertyValue, property);

    } else if (definitionForProperty.validate !== undefined) {
        return definitionForProperty.validate(associatedPropertyValue);
    }    

    // NOTE - If we get here the property in the rules object was something we don't need to deal with,
    // so we just ignore it
}

var apply = function(toValidate, definition) {
    var result = {};

    for(var property in definition) if (definition.hasOwnProperty(property)) {
        var errorsForProperty = getErrorsForProperty(property, toValidate, definition);

        if (errorsForProperty !== undefined && errorsForProperty.length > 0) {
            result[property] = errorsForProperty;
        }
    }

    return result;
}

module.exports = {
    apply: apply
}