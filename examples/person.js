var log = require('util').log,
    inspect = require('util').inspect,
    validatron = require('./../lib/validatron'),
    mustBe = require('./../lib/mustBe');

var invalidPerson = { 
    name: "Elmo", 
    age : -1, 
    address: null, 
    weight: 5 
};

var personSchema = {
    age: mustBe().populated().numeric( {min : 0, max: 130} ),
    name: mustBe().populated().string( { minLength: 5, maxLength: 20} ),
    weight: function() { this.populated().numeric(); }
    // TODO - Address using the mapper from address.coffee
}

var result = validatron(invalidPerson, personSchema);

log(inspect(result));