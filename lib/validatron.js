var ValidationError = require('./ValidationError')

var getErrorsForProperty = function(property, toValidate, definition) {
    // TODO: Only take if its got required methood
    // TODO: If object doesn't have associated property
    var associatedPropertyValue = toValidate[property];
    var validator = definition[property];

    return validator.validate(associatedPropertyValue);
}

var validationResult = {
    throw : function() {
        if (Object.keys(this).length > 0) {
            throw new ValidationError("Validation failed.", this)
        }
    }
}

var validatron = function(toValidate, definition) {
    var result = Object.create(validationResult);

    for(var property in definition) if (definition.hasOwnProperty(property)) {
        var errorsForProperty = getErrorsForProperty(property, toValidate, definition);

        if (errorsForProperty) {
            result[property] = errorsForProperty;
        }
    }

    return result;
}

module.exports = validatron;
