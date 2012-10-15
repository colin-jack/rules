var failureType = require('./failureType')

var createFailureDescription = function(value, message) {
    return {
    	message: message,
        type: failureType.outsideRange,
        value : value
    }
};

var validate = function(value, minimum, maximum) {
	if (value > maximum) {
		return createFailureDescription(value, "The value cannot be greater than " + maximum + ".");
	}

	if (value < minimum) {
		return createFailureDescription(value, "The value cannot be less than " + minimum + ".");
	}
}

var create = function(config) {
    return function(value) {
        return validate(value, config.minimum, config.maximum);
    }
}

module.exports = {
    create : create
}