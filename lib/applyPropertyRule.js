var valueFirstFluentInterface = require('./fluentInterface/valueFirstFluentInterface');

var callValidationFunction = function(ruleForProperty, associatedPropertyValue, propertyName) {
    // The function will be passed an object that holds the fluent interface that can be used,
    // it will track errors as they happen.
    var context = valueFirstFluentInterface.create(associatedPropertyValue, propertyName);

    ruleForProperty.call(context);

    return context.error;
};

var applyPropertyRule = function(ruleForProperty, associatedPropertyValue, propertyName) {
    if (typeof ruleForProperty === 'function') {
        // The right side is a function that presumably does some validation (though if it doesn't thats its problem)
        return callValidationFunction(ruleForProperty, associatedPropertyValue, propertyName);
    } 

    else if (ruleForProperty.validate !== undefined) {
        // The right hand side is a validator created using mustBe()
        return ruleForProperty.validate(associatedPropertyValue);
    }    

    else if (typeof ruleForProperty === 'object') {
        // The right hand side is probably a rules object in its own right so we try to use it to validate
        // the property value
        var applyRules = require('./applyRules');
        return applyRules(associatedPropertyValue, ruleForProperty);
    }

    // NOTE - If we get here the property in the rules object was something we don't need to deal with,
    // so we just ignore it
};

module.exports = applyPropertyRule;