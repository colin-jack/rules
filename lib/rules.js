var ValidationError = require('./ValidationError')
var valueFirstFluentInterface = require('./fluentInterface/valueFirstFluentInterface')

var getErrorsForProperty = function(property, toValidate, definition) {
    var definitionForProperty = definition[property];
    var associatedPropertyValue = toValidate !== undefined ? toValidate[property] : undefined;

    return createPropertyValidator(definitionForProperty, associatedPropertyValue, property);
}

var callValidationFunction = function(definitionForProperty, associatedPropertyValue, property) {
    // The function will be passed an object that holds the fluent interface that can be used,
    // it will track errors as they happen.
    var context = valueFirstFluentInterface.create(associatedPropertyValue, property);

    definitionForProperty.call(context);

    return context.error;
};

var createPropertyValidator = function(definitionForProperty, associatedPropertyValue, property) {
    if (typeof definitionForProperty === 'function') {
        // The right side is a function that presumably does some validation (though if it doesn't thats its problem)
        return callValidationFunction(definitionForProperty, associatedPropertyValue, property);
    } 

    else if (definitionForProperty.validate !== undefined) {
        // The right hand side is a validator created using mustBe()
        return definitionForProperty.validate(associatedPropertyValue);
    }    

    else if (typeof definitionForProperty === 'object') {
        // The right hand side is probably a rules object in its own right so we try to use it to validate
        // the property value
        return applyValidation(associatedPropertyValue, definitionForProperty);
    }

    // NOTE - If we get here the property in the rules object was something we don't need to deal with,
    // so we just ignore it
}

var applyValidation = function(toValidate, definition) {
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

var throwIfCannotApplyRules = function(definition) {
    if (definition === null || typeof definition !== 'object') {
        throw new Error("The rules object was not valid.");
    }
}

var throwIfCannotValidate = function(toValidate) {
    if (toValidate === null)  {
        throw new Error("The target of the validation cannot be null.");
    }

    if (toValidate === undefined)  {
        throw new Error("The target of the validation cannot be undefined.");
    }

    if (typeof toValidate !== 'object') {
        throw new Error("The target of the validation must be a valid object.");
    }
}

var startValidation = function(toValidate, definition) {
    debugger;
    throwIfCannotValidate(toValidate);
    throwIfCannotApplyRules(definition);

    return applyValidation(toValidate, definition);
}

module.exports = {
    apply: startValidation
}