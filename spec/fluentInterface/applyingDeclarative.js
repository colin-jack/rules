var testUtil = require('./testUtil')
var mustBe = lib.require('mustBe'),
    now = lib.require('now');

describe('rules - declarative', function() {
	var validationDefinitions = {
		numericRequiredAge : {
			age : mustBe().populated().numeric(),
    	},
    	numericOptionalAge : {
			age : mustBe().numeric()
    	}, 
		numericAgeWithRange : {
			age : mustBe().populated().numeric({ min: 0, max: 130})
    	},
        requiredString : {
            name: mustBe().populated().string()
        },
        phoneNumberMustMatchRegex: {
            phoneNumber: mustBe().matchFor({ pattern: /^\(?0( *\d\)?){9,10}$/ })
        },
        dateRequired : {
            dateOfBirth: mustBe().populated().date()
        },
        dateOptional: {
            dateOfBirth: mustBe().date()
        },
        dateOfBirthMoreThanYearAgo: {
            dateOfBirth: mustBe().date({ before: now.subtract("years", 1) })
        },
        requiredArrayOfFriends : {
            friends : mustBe().populated().array() 
        }
	};

    testUtil.runBasicTests(validationDefinitions);
});