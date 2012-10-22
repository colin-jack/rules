var log = require('util').log,
    inspect = require('util').inspect,
    validatron = require('./../lib/validatron'),
    mustBe = require('./../lib/mustBe'),
    now = require('./../lib/validators/date/now'),
    moment = require('moment');

var invalidPerson = { 
    name: "Elmo", 
    dateOfBirth : moment(), 
    address: null, 
    weight: 5,
    friends: []
};

var personSchema = {
    name        : mustBe().populated().string( { minLength: 5, maxLength: 20} ),
    weight      : mustBe().populated().numeric({min : 0, max: 130}),
    dateOfBirth : mustBe().date({ before: now.subtract("years", 1) }),
    friends     : mustBe().populated().array()
    // TODO - Address using the mapper from address.coffee
}

var result = validatron(invalidPerson, personSchema);

log(inspect(result));