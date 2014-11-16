var assert = require('chai').assert,
    ensure = require('./../../index').ensure;

describe("rules - ensure: ", function() {
    describe("when you use ensure for integer validation", function() {
        var expectedFailureType = "not_an_integer";

        it("should fail if integer value is not numeric", function() {
            var shouldFail = function() { ensure(5.5).integer(); }
            assertThrows(shouldFail, undefined, "The value must be an integer.", expectedFailureType);
        });

        it("should fail if integer value is not numeric and you specify property", function() {
            var shouldFail = function() { ensure(5.5, "age").integer(); }
            assertThrows(shouldFail, "age", "The value must be an integer.", expectedFailureType);
        });

        it("should pass if integer value is OK", function() {
            var shouldPass = function() { ensure(5, "age").integer(); }
            assert.doesNotThrow(shouldPass);
        });
    });

    describe("when you use ensure for populate string validation", function() {
        it("should fail if value is not populated", function() {
            var shouldFail = function() { ensure(null, "name").populated().string(); }
            assertThrows(shouldFail, "name", "The value must be populated.", "not_populated");
        });

        it("should fail if integer value is not a string", function() {
            var shouldFail = function() { ensure(false, "name").populated().string(); }
            assertThrows(shouldFail, "name", "The value must be a string.", "not_a_string");
        });

        it("should pass if integer value is OK", function() {
            var shouldPass = function() { ensure("bob", "name").populated().string(); }
            assert.doesNotThrow(shouldPass);
        });
    });

    function assertThrows(shouldFail, expectedProperty, expectedMessage, expectedFailureType) {
        try
        {
            shouldFail();
        } catch(e) {
            assert.equal(e.message, expectedMessage, "Incorrect message.");
            assert.equal(e.property, expectedProperty, "Incorrect property.");
            assert.equal(e.type, expectedFailureType, "Incorrect type.");
            return;
        }

        assert.fail("Did not throw an exception for property 'expectedProperty'");
    }
});