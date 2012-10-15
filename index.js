// See https://github.com/umdjs/umd, specifically https://github.com/umdjs/umd/blob/master/returnExports.js
umdDefine(this, 'validatron', ['mustBe', 'ValidationError'], function () {

	var getErrorsForProperty = function(property, toValidate, definition) {
		// TODO: Only take if its got required methood
		// TODO: If object doesn't have associated property
		var associatedPropertyValue = toValidate[property];
		var validator = definition[property];

		return validator.validate(associatedPropertyValue);
	}

    var validatron = function(toValidate, definition) {
    	var result = {};

    	for(var property in definition) if (definition.hasOwnProperty(property)) {
    		var errorsForProperty = getErrorsForProperty(property, toValidate, definition);

			if (errorsForProperty) {
				result[property] = errorsForProperty;
			}
    	}

    	return result;
    }
    
    return validatron;
});