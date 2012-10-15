// See https://github.com/umdjs/umd, specifically https://github.com/umdjs/umd/blob/master/returnExports.js
umdDefine(this, 'mustBe', ['numericValidator', 'populatedValidator'], function (numericValidator, populatedValidator) {
    var addValidator = function(toAdd) {
        this.validationsToApply  = this.validationsToApply || [];
        this.validationsToApply.push(toAdd);
    }

    var numeric = function(config) {
        this.addValidator(numericValidator.create(config));
        return this;
    }

    var populated = function() {
        this.addValidator(populatedValidator);
        return this;
    };

    var validate = function(value) {
        var failures = [];

        for(var i  = 0, len = this.validationsToApply.length; i < len; i++) {
            var validationToApply = this.validationsToApply[i];
            var result = validationToApply(value);

            if (result) {
                failures.push(result);
            }
        }

        return failures;
    }

    var validationFluentInterface = {
        populated: populated,
        numeric : numeric,
        addValidator : addValidator,
        validate : validate
    };

    var mustBe = function() {
        return Object.create(validationFluentInterface);
    };

    return mustBe;
});