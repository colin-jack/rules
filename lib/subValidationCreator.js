var _u = require('underscore')

var supportedValidationArguments = ['minimum', 'maximum'];

var throwIfConfigHasUnexpectedKeys = function(config) {
    var keys = Object.keys(config);
    var unsupported = _u.difference(keys, supportedValidationArguments);

    if (unsupported.length > 0)
    {
        throw new Error('Unexpected configuration values provided (' + unsupported.join('/') + '). Only ' + supportedValidationArguments.join('/') + ' supported.');
    }
}

var createSubValidations = function(config) {
    if (!config) return;

    throwIfConfigHasUnexpectedKeys(config);

    var subValidations = [];

    if (config.minimum || config.maximum) {
        subValidations.push(numericRangeValidator.create(config));
    }

    return subValidations;
};

module.exports = createSubValidations;
