var failureType = require('./../../failureType')
var hasValue = require('./../../hasValue')
var parseMoment = require('./parseMoment')


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

var create = function(config) {
    // config.after = config.after === undefined ? undefined : parseAndThrowOnFailure(config.after);
    // config.before = config.before === undefined ? undefined : parseAndThrowOnFailure(config.before);

 //   validateRange(after, before);

    var before = config.before === undefined ? undefined : config.before();
    var after = config.after === undefined ? undefined : config.after();

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