var log = require('util').log,
    inspect = require('util').inspect,
    rules = require('./../lib/rules'),
    mustBe = require('./../lib/mustBe'),
    now = require('./../lib/validators/date/now'),
    moment = require('moment');

var nameRules = {
    first  : mustBe().populated().string({ minLength: 5, maxLength: 20}),
    second : mustBe().populated().string({ minLength: 5, maxLength: 20}),
}

var personRules = {
    name         : nameRules,

    weight       : mustBe().populated().numeric({ min : 0, max: 130 }),
    dateOfBirth  : mustBe().date({ before: now.subtract("years", 1) }),
    friends      : mustBe().populated().array()
}

var invalidPerson = { 
    name: {
        first: "Brian"
    },
    dateOfBirth : moment(), 
    address: null, 
    weight: 5,
    friends: []
};

var result = rules.apply(invalidPerson, personRules);

log(inspect(result));