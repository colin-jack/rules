var log = require('util').log,
    inspect = require('util').inspect,
    validatron = require('./../lib/validatron'),
    mustBe = require('./../lib/mustBe');

var invalidPerson = { 
    name: "", 
    age : -1, 
    address: null, 
    weight: "bob" 
};

var personSchema = {
    age: mustBe().populated().numeric( {minimum : 0, maximum: 130} ),
    name: mustBe().populated(),
    weight: function() { this.populated().numeric(); }
}

var result = validatron(invalidPerson, personSchema);

log(inspect(result));