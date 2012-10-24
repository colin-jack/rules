var numericValidator = require('./../validators/numeric/numericValidator')
var populatedValidator = require('./../validators/populatedValidator')
var stringValidator = require('./../validators/string/stringValidator')
var regularExpressionValidator = require('./../validators/regularExpressionValidator')
var dateValidator = require('./../validators/date/dateValidator')
var arrayValidator = require('./../validators/arrayValidator')

var numeric = function(config) {
    return this.addValidator(numericValidator.create(config));
}

var matchFor = function(config) {
    return this.addValidator(regularExpressionValidator.create(config));
}

var populated = function() {
    return this.addValidator(populatedValidator.create());
};

var string = function(config) {
    return this.addValidator(stringValidator.create(config));
};

var date = function(config) {
    return this.addValidator(dateValidator.create(config));
};

var array = function() {
    return this.addValidator(arrayValidator.create());
};

var addValidator = function(toAdd) {
    this.validationsToApply  = this.validationsToApply || [];
    this.validationsToApply.push(toAdd);

    return this;
}

var validate = function(value) {
    for(var i  = 0, len = this.validationsToApply.length; i < len; i++) {
        var validationToApply = this.validationsToApply[i];
        var result = validationToApply(value);

        if (result) {
            return result;
        }
    }
}

module.exports = {
    populated: populated,
    matchFor: matchFor,

    numeric: numeric,
    string: string,
    date: date,
    array: array,

    validate: validate,

    addValidator: addValidator
};
