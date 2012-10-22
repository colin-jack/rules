var assert = require('chai').assert;
var rules = lib.require('rules'),
    mustBe = lib.require('mustBe');

describe('rules - apply', function() {
    var simpleRules = {
        name        : mustBe().populated().string(),
        dateOfBirth : function() { this.date().populated() },
        other       : function() { return "foo" },
        yetAnother  : function() { return [] },
        last        : { message: "irrelevant"}
    }

    describe('When you apply a simple set of rules to an object that meets them', function() {
        it('should pass validation', function() {
            var valid = { name: "bob", dateOfBirth: Date(-500) };
            var result = rules.apply(valid, simpleRules);
            assert.equal(0, Object.keys(result).length);
        });
    });

    describe('When you apply a simple set of rules to an object that does not meet them', function() {
        it('should fail validation', function() {
            var invalid = { name: "" };
            var result = rules.apply(invalid, simpleRules);
            assert.isDefined(2, Object.keys(result).length);
        });
    });
});