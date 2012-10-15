// See https://github.com/umdjs/umd, specifically https://github.com/umdjs/umd/blob/master/returnExports.js
umdDefine(this, 'numericValidator', ['failureType', 'numericRangeValidator'], function ( failureType, numericRangeValidator) {
    var createNonNumericFailureDescription = function() {
        return {
            message: "The value must be numeric.",
            type: failureType.notNumeric,
            value : value
        };
    };

    var validate = function(value) {
        if (!value) {
            return;
        }

        var isNumeric = !isNaN(parseFloat(value)) && isFinite(value)

        if (!isNumeric) {
            return createNonNumericFailureDescription();
        }
    };

    var ensureConfigHasNoUnexpectedValues = function(config) {
    };

    var createSubValidations = function(config) {
        if (!config) return;

        var subValidations = [];

        if (config.minimum || config.maximum) {
            subValidations.push(numericRangeValidator.create(config));
        }

        return subValidations;
    };

    var applySubValidations = function(subValidations, value) {
        if (!subValidations) return;
        
        for (var i = 0, len = subValidations.length; i < subValidations.length; i++) {
            var subValidator = subValidations[i];
            var result = subValidator(value);

            if (result) return result;
        }
    };

    var create = function(config) {
        ensureConfigHasNoUnexpectedValues(config);

        var subValidations = createSubValidations(config);

        return function(value) {
            var failed = validate(value);

            var toReturn = failed ? failed : applySubValidations(subValidations, value);
            return toReturn;
        }
    }

    return {
        create : create
    }
});