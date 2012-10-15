// See https://github.com/umdjs/umd, specifically https://github.com/umdjs/umd/blob/master/returnExports.js
umdDefine(this, 'numericRangeValidator', ['failureType'], function (failureType) {
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

    return {
        create : create
    }
});