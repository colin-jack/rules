var rulesLib = require('./../../namespace.js');
var RulesError = rulesLib.RulesError;
var failureType = rulesLib.failureType;
var hasValue = rulesLib.hasValue;

var moment = require('moment')

var createFailureDescription = function(value, message) {
    return { message: message, type: failureType.outsideDateRange, value : value }
};

var validate = function(value, after, before) {
    if (value > before) {
        return createFailureDescription(value, "The date must be before '" + moment(before).toString() + "'");
    }

    if (value < after) {
        return createFailureDescription(value, "The date must be after '" + moment(after).toString() + "'");
    }
}

var validateRange = function(after, before) {
    if ((after !== undefined && before !== undefined) && after >= before) {
        throw new RulesError("The before value must be later than the after value.");   
    }
}

var ifDefinedIsMoment = function(configValue) {
    return configValue === undefined || moment.isMoment(configValue);
}

var throwIfRangeInvalid = function(after, before) {
    if (ifDefinedIsMoment(before) === false || ifDefinedIsMoment(after) === false) {
        throw new RulesError("When included the before/after values should be dates or parsable as dates.")
    }

    validateRange(after, before);
}

var create = function(config) {
    var after = config.after === undefined ? undefined : config.after();
    var before = config.before === undefined ? undefined : config.before();

    throwIfRangeInvalid(after, before);

    return function(value) {
        return validate(value, after, before);
    }
}

var handles = function(config) {
    return (config.after !== undefined || config.before !== undefined);
}

module.exports = {
    create : create,
    handles: handles
}