var log = require('util').log,
    inspect = require('util').inspect,
    validatron = require('./../lib/validatron'),
    mustBe = require('./../lib/mustBe');

var veryInvalid = { name: "", "age" : -1, address: null, weight: "bob" };

var validationDefinition = {
    age: mustBe().populated().numeric({minimum : 0, maximum: 130}),
    name: mustBe().populated(), //.string({maxLength: 50}),
    weight: function() { this.populated().numeric(); }
}

var result = validatron(veryInvalid, validationDefinition);

log(inspect(result));