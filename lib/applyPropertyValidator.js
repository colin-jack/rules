var valueFirstFluentInterface = require('./fluentInterface/valueFirstFluentInterface');

var callValidationFunction = function(rulesForProperty, associatedPropertyValue, property) {
    // The function will be passed an object that holds the fluent interface that can be used,
    // it will track errors as they happen.
    var context = valueFirstFluentInterface.create(associatedPropertyValue, property);

    rulesForProperty.call(context);

    return context.error;
};

var applyPropertyValidator = function(rulesForProperty, associatedPropertyValue, property) {
    if (typeof rulesForProperty === 'function') {
        // The right side is a function that presumably does some validation (though if it doesn't thats its problem)
        return callValidationFunction(rulesForProperty, associatedPropertyValue, property);
    } 

    else if (rulesForProperty.validate !== undefined) {
        // The right hand side is a validator created using mustBe()
        return rulesForProperty.validate(associatedPropertyValue);
    }    

    else if (typeof rulesForProperty === 'object') {
        // The right hand side is probably a rules object in its own right so we try to use it to validate
        // the property value
        var applyRules = require('./applyRules');
        return applyRules(associatedPropertyValue, rulesForProperty);
    }

    // NOTE - If we get here the property in the rules object was something we don't need to deal with,
    // so we just ignore it
};

module.exports = applyPropertyValidator;