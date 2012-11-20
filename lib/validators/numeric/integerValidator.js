var failureType = require('./../../failureType')
var hasValue = require('./../../hasValue')

var createFailureDescription = function(value, message) {
    return { message: message, type: failureType.nonInteger, value : value }
};

var validate = function(value) {
    return ~~value === value;
}

var create = function(config) {
    return function(value) {
        return validate(value);
    }
}

var handles = function(config) {
    return true;
}

module.exports = {
    create : create,
    handles: handles
}