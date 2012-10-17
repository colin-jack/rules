var numericValidator = require('./numeric/numericValidator')
var populatedValidator = require('./populatedValidator')

var addValidator = function(toAdd, addTo) {
    addTo.validationsToApply  = addTo.validationsToApply || [];
    addTo.validationsToApply.push(toAdd);
}

var numeric = function(config) {
    addValidator(numericValidator.create(config), this);
    return this;
}

var populated = function() {
    addValidator(populatedValidator.create(), this);
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

module.exports = {
    populated: populated,
    numeric : numeric,
    validate : validate
};