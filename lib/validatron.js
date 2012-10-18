var ValidationError = require('./ValidationError')
var valueFirstFluentInterface = require('./fluentInterface/valueFirstFluentInterface')

var getErrorsForProperty = function(property, toValidate, definition) {
    // TODO: Only take if its got required methood
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

    // TODO: Add required check to ensure its an object we can work with.
    } else if (true) {
        return definitionForProperty.validate(associatedPropertyValue);
    }
    else
    {
        // TODO: blow up
    }
    
}

var validatron = function(toValidate, definition) {
    var result = {};

    for(var property in definition) if (definition.hasOwnProperty(property)) {
        var errorsForProperty = getErrorsForProperty(property, toValidate, definition);

        if (errorsForProperty.length > 0) {
            result[property] = errorsForProperty;
        }
    }

    return result;
}

module.exports = validatron;