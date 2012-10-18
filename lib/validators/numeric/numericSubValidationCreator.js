var _u = require('underscore')
var numericRangeValidator = require('./numericRangeValidator');
var SupportedValidationArguments = ['min', 'max'];

    
var throwIfConfigHasUnexpectedKeys = function(config) {
    var keys = Object.keys(config);
    var unsupported = _u.difference(keys, SupportedValidationArguments);

    if (unsupported.length > 0)
    {
        throw new Error('Unexpected configuration values provided (' + unsupported.join('/') + '). Only ' + SupportedValidationArguments.join('/') + ' supported.');
    }
}

var createSubValidations = function(config) {
    if (!config) return;

    throwIfConfigHasUnexpectedKeys(config);

    var subValidations = [];

    if (numericRangeValidator.handles(config)) {
        subValidations.push(numericRangeValidator.create(config));
    }

    return subValidations;
};

module.exports = createSubValidations;
