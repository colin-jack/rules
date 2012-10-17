var validatronTestUtil = require('./testUtil')
var mustBe = lib.require('mustBe')

describe('validatron - declarative', function() {
	var validationDefinitions = {
		numericRequiredAge : {
			age : mustBe().populated().numeric(),
    	},
    	numericOptionalAge : {
			age : mustBe().numeric()
    	}, 
		numericAgeWithRange : {
			age : mustBe().populated().numeric({ minimum: 0, maximum: 130})
    	},
	};

    validatronTestUtil.runNumericTests(validationDefinitions);
});