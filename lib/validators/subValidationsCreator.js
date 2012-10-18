var _u = require('underscore')
    
var throwIfConfigHasUnexpectedKeys = function(config, supportedArguments) {
    var keys = Object.keys(config);
    var unsupported = _u.difference(keys, supportedArguments);

    if (unsupported.length > 0)
    {
        throw new Error('Unexpected configuration values provided (' + unsupported.join('/') + '). Only ' + supportedArguments.join('/') + ' supported.');
    }
}

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
