var validationFluentInterface = require('./validationFluentInterface')

var mustBe = function() {
    return Object.create(validationFluentInterface);
};

module.exports = mustBe;
