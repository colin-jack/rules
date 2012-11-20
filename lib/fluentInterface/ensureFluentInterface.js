var numericValidator = rulesLib.require('numericValidator')
var populatedValidator = rulesLib.require('populatedValidator')
var stringValidator = rulesLib.require('stringValidator')
var regularExpressionValidator = rulesLib.require('regularExpressionValidator')
var dateValidator = rulesLib.require('dateValidator')
var arrayValidator = rulesLib.require('arrayValidator')
var integerValidator = rulesLib.require('integerValidator');

var numeric = function(config) {
    return this.applyValidator(numericValidator.create(config))
}

var matchFor = function(config) {
    return this.applyValidator(regularExpressionValidator.create(config))
}

var populated = function populated() {
    return this.applyValidator(populatedValidator.create())
};

var integer = function integer() {
    return this.applyValidator(integerValidator.create())
};

var string = function(config) {
    return this.applyValidator(stringValidator.create(config));
};

var date = function(config) {
    return this.applyValidator(dateValidator.create(config));
};

var array = function() {
    return this.applyValidator(arrayValidator.create());
};

var applyValidator = function applyValidator(validator) {
    var result = validator(this.value);

    if (result) {
        var error = new Error(result.message);
        error.type = result.type;
        
        if (this.property) {
            error.property = this.property;
        }

        throw error;
    }

    return this;
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
