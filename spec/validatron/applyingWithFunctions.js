var testUtil = require('./testUtil')

describe('validatron - declarative with functions', function() {
	
	var validationDefinitions = {
		numericRequiredAge: {
			age : function() { this.populated().numeric(); }
    	},
    	numericOptionalAge: {
			age : function() { this.numeric(); }
    	}, 
		numericAgeWithRange : {
			age : function() { this.populated().numeric({ min: 0, max: 130}); }
    	},
        requiredString : {
            name: function() { this.populated().string(); }
        },
        phoneNumberMustMatchRegex: {
            phoneNumber: function() { this.matchFor({ pattern: /^\(?0( *\d\)?){9,10}$/ }) }
        }
	};

    testUtil.runBasicTests(validationDefinitions);
});