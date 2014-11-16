var rulesLib = require('./../namespace.js');
var RulesError = rulesLib.RulesError;
var _u = require('underscore')

module.exports = function(config, supportedArguments) {
    var keys = Object.keys(config);
    var unsupported = _u.difference(keys, supportedArguments);

    if (unsupported.length > 0)
    {
        throw new RulesError('Unexpected configuration values provided (' + unsupported.join('/') + '). Only ' + supportedArguments.join('/') + ' supported.');
    }
}