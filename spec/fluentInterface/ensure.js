var assert = require('chai').assert,
    ensure = require('./../../index').ensure;

describe("rules - ensure", function() {
    describe("when you use ensure for integer validation", function() {
        it("should fail if integer value is not numeric", function() {
            var shouldFail = function() { ensure(5.5).integer(); }
            assertThrows(shouldFail, undefined, "The value must be an integer.");
        });

        it("should fail if integer value is not numeric and you specify property", function() {
            var shouldFail = function() { ensure(5.5, "age").integer(); }
            assertThrows(shouldFail, "age", "The value must be an integer.");
        });

        it("should pass if integer value is OK", function() {
            var shouldPass = function() { ensure(5, "age").integer(); }
            assert.doesNotThrow(shouldPass);
        });
    });

    function assertThrows(shouldFail, expectedProperty, expectedMessage) {
        try
        {
            shouldFail();
        } catch(e) {
            assert.equal(e.message, expectedMessage, "Incorrect message.");
            assert.equal(e.property, expectedProperty, "Incorrect property.");
            return;
        }

        assert.fail("Did not throw an exception for property 'expectedProperty'");
    }
});