var failureType = require('./../../failureType')
var hasValue = require('./../../hasValue')
var moment = require('moment')


// dateOfBirth: mustBe().date({  before: now.add("years", 5), 
//                               after: now.subtract("years", -5) 
//                           })

var createFailureDescription = function(value, message) {
    return { message: message, type: failureType.outsideDateRange, value : value }
};

var validate = function(value, after, before) {
    if (value > before) {
        return createFailureDescription(value, "The date is too far in the future.");
    }

    if (value < after) {
        return createFailureDescription(value, "The date is too far in the past.");
    }
}

// var parseAndThrowOnFailure = function(toParse) {
//     if (parseMoment(toParse) === null) {
//        throw new Error("When included the before/after values should be dates or parsable as dates.");
//     }
// }

// var validateRange = function(after, before) {
//     if ((after !== undefined && before !== undefined) && after >= before) {
//         throw new Error("The after value must be before the before value.");   
//     }
// }

var ifDefinedIsMoment = function(configValue) {
    return configValue === undefined || moment.isMoment(configValue);
}

var throwIfBeforeAfterInvalid = function(before, after) {
    if (ifDefinedIsMoment(before) == false || ifDefinedIsMoment(after) == false) {
        throw new Error("When included the before/after values should be dates or parsable as dates.")
    }
}

var create = function(config) {
    // config.after = config.after === undefined ? undefined : parseAndThrowOnFailure(config.after);
    // config.before = config.before === undefined ? undefined : parseAndThrowOnFailure(config.before);

 //   validateRange(after, before);

    var before = config.before === undefined ? undefined : config.before();
    var after = config.after === undefined ? undefined : config.after();

    throwIfBeforeAfterInvalid(before, after);

    // if (typeof value === 'number') {
    //     throw new Error("The value passed as the second argument to now must be a moment/date/date string.")
    // }

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