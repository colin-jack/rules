var numericValidator = rulesLib.require('numericValidator')
var populatedValidator = rulesLib.require('populatedValidator')
var stringValidator = rulesLib.require('stringValidator')
var regularExpressionValidator = rulesLib.require('regularExpressionValidator')
var dateValidator = rulesLib.require('dateValidator')
var arrayValidator = rulesLib.require('arrayValidator')
var integerValidator = rulesLib.require('integerValidator');

var numeric = function(config) {
    this.applyValidator(numericValidator.create(config))
}

var matchFor = function(config) {
    this.applyValidator(regularExpressionValidator.create(config))
}

var populated = function() {
    this.applyValidator(populatedValidator.create())
};

var integer = function integer() {
    this.applyValidator(integerValidator.create())
};

var string = function(config) {
    this.applyValidator(stringValidator.create(config));
};

var date = function(config) {
    this.applyValidator(dateValidator.create(config));
};

var array = function() {
    this.applyValidator(arrayValidator.create());
};

var applyValidator = function applyValidator(validator) {
    var result = validator(this.value);

    if (result) {
        var error = new Error(result.message);
        
        if (this.property) {
            error.property = this.property;
        }

        throw error;
    }
}

module.exports = {
    populated: populated,
    matchFor: matchFor,

    numeric: numeric,
    integer: integer,
    string: string,
    date: date,
    array: array,

    applyValidator: applyValidator
};
