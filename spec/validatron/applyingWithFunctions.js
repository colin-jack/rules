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
			age : function() { this.populated().numeric({ minimum: 0, maximum: 130}); }
    	},
        requiredString : {
            name: function() { this.populated().string(); }
        }
	};

    testUtil.runBasicTests(validationDefinitions);
});