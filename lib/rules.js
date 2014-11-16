var rulesLib = require('./namespace.js');
var RulesError = rulesLib.RulesError;

var applyRules = require('./applyRules'),
    applyPropertyRule = require('./applyPropertyRule')

var throwIfCannotApplyRules = function(definition) {
    if (definition === null || typeof definition !== 'object') {
        throw new RulesError("The rules object was not valid.");
    }
}

var throwIfCannotValidate = function(toValidate) {
    if (toValidate === null)  {
        throw new RulesError("The target of the validation cannot be null.");
    }

    if (toValidate === undefined)  {
        throw new RulesError("The target of the validation cannot be undefined.");
    }

    if (typeof toValidate !== 'object') {
        throw new RulesError("The target of the validation must be a valid object.");
    }
}

var startValidation = function(toValidate, definition) {
    throwIfCannotValidate(toValidate);
    throwIfCannotApplyRules(definition);

    return applyRules(toValidate, definition);
}

module.exports = {
    apply: startValidation,
    applyRule: applyPropertyRule
}