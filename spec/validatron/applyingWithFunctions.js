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
        }
	};

    testUtil.runBasicTests(validationDefinitions);
});