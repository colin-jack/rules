var assert = require('chai').assert;
var dateValidator = rulesLib.require('dateValidator');

describe('date validator', function() {
    describe("When config has unsupported values", function() {
        it("should throw exception", function() {
            var create = function() {
                dateValidator.create( {bob: "yes", bill: 5} );
            }

            assert.throws(create, /Unexpected configuration values provided \(bob\/bill\). Only before\/after supported./);
        });
    });
});