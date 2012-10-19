var _u = require('underscore')
var throwIfConfigHasUnexpectedKeys = require('./throwIfConfigHasUnexpectedKeys')
    
var createSubValidations = function(config, validators, supportedArguments) {
    if (!config) return;

    throwIfConfigHasUnexpectedKeys(config, supportedArguments);

    var subValidations = [];

    _u.each(validators, function(validator) {
        if (validator.handles(config)) {
            subValidations.push(validator.create(config));
        }
    });

    return subValidations;
};

module.exports = createSubValidations;
