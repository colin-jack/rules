var failureType = require('./../failureType')
var hasValue = require('./../hasValue')
var format = require('util').format;

var validate = function(value, property) {
    if (hasValue(value) === true) {
        return;
    }
    
    var message = format("The %svalue must be populated.", property == undefined ? "" : "'" + property + "' ");

    return {
        message: message,
        type: failureType.notPopulated,
        value : value
    }
};

var create = function() {
    return validate;
}

module.exports = {
    create : create
}