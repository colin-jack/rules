var validationFluentInterface = require('./fluentInterface/validationFluentInterface')

var mustBe = function() {
    return Object.create(validationFluentInterface);
};

module.exports = mustBe;
