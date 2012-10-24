var assert = require('chai').assert;
var rules = lib.require('rules'),
    mustBe = lib.require('mustBe'),
    compare = require('objectcompare');

describe('rules - apply', function() {
    var nameRules = {
        first  : mustBe().populated().string(),
        second : mustBe().populated().string()
    }

    var simpleRules = {
        name        : nameRules,

        dateOfBirth : function() { this.date().populated() },

        other       : function() { return "foo" },
        yetAnother  : function() { return [] },
        last        : { message: "irrelevant"}
    }

    describe('When you apply a simple set of rules to an object that meets them', function() {
        it('should pass validation', function() {
            var valid = { 
                            name: { first: "bob", second: "marsh" }, 
                            dateOfBirth: Date(-500) 
                        };
            var result = rules.apply(valid, simpleRules);
            assert.isUndefined(result);
        });
    });

    describe('When you apply a simple set of rules to an object that does not meet them', function() {
        var result;

        beforeEach(function() {
            var invalid = { name: "" };
            result = rules.apply(invalid, simpleRules);
        });

        it('should notify you of the failure of two top level objects', function() {
            assert.equal(Object.keys(result).length, 2);
        });

        it('should fail for expect reasons', function() {
            var expected = { 
                name: { 
                    first: 
                      { message: 'The value must be populated.',
                        type: 'not_populated',
                        value: undefined },
                     second: 
                      { message: 'The value must be populated.',
                        type: 'not_populated',
                        value: undefined } },
                dateOfBirth: 
                   { message: 'The value must be populated.',
                     type: 'not_populated',
                     value: undefined } 
            };

            var comparison = compare(result, expected);
            assert.isTrue(comparison.equal,  "Unexpected difference: " + JSON.stringify(comparison.differences));
        });
    });

    // TODO - Cycles in rules objects
    // TODO - Multiple level rules objects
});