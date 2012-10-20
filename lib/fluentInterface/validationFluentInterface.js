var numericValidator = require('./../validators/numeric/numericValidator')
var populatedValidator = require('./../validators/populatedValidator')
var stringValidator = require('./../validators/string/stringValidator')
var regularExpressionValidator = require('./../validators/regularExpressionValidator')
var dateValidator = require('./../validators/dateValidator')

var addValidator = function(toAdd, addTo) {
    addTo.validationsToApply  = addTo.validationsToApply || [];
    addTo.validationsToApply.push(toAdd);
}

var numeric = function(config) {
    addValidator(numericValidator.create(config), this);
    return this;
}

var matchFor = function(config) {
    addValidator(regularExpressionValidator.create(config), this);
    return this;
}

var populated = function() {
    addValidator(populatedValidator.create(), this);
    return this;
};

var string = function(config) {
    addValidator(stringValidator.create(config), this);
    return this;
};

var date = function(config) {
    addValidator(dateValidator.create(config), this);
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
    numeric: numeric,
    string: string,
    validate: validate,
    matchFor: matchFor,
    date: date
};
