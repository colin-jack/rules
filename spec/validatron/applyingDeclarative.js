var testUtil = require('./testUtil')
var mustBe = require('./../testFixture').require('mustBe')

describe('validatron - declarative', function() {
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
        // phoneNumberMustMatchRegex: {
        //     phoneNumber: mustBe().match({ pattern: /^\(?0( *\d\)?){9,10}$/ })
        // }
	};

    testUtil.runBasicTests(validationDefinitions);
});