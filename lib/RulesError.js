var RulesError = function(message, errors) {
    this.errors = errors;
    this.message = message;
};

RulesError.prototype = new Error();

module.exports = RulesError;
