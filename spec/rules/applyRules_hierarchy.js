var assert = require('chai').assert;
var rules = lib.require('rules'),
    mustBe = lib.require('mustBe'),
    compare = require('objectcompare');

describe('rules - apply', function() {
    var nameRules = {
        first  : mustBe().populated().string(),
        second : mustBe().populated().string()
    }

    var authorRules = {
        name : nameRules,
        bio  : {
            description: function() { this.populated().string({minLength: 20}) }
        }
    }

    var postRules = {
        author: authorRules
    }

    describe('When you apply a complex set of rules to an object that meets them', function() {
        it('should pass validation', function() {
            var valid = { 
                            author: { 
                                name: { first: "bob", second: "marsh" }, 
                                bio: { description: "sadsadsadsadsadasdasda" }
                            }
                       };
            var result = rules.apply(valid, postRules);
            assert.isUndefined(result);
        });
    });

    // describe('When you apply a simple set of rules to an object that does not meet them', function() {
    //     var result;

    //     beforeEach(function() {
    //         var invalid = { name: "" };
    //         result = rules.apply(invalid, simpleRules);
    //     });

    //     it('should notify you of the failure of two top level objects', function() {
    //         assert.equal(Object.keys(result).length, 2);
    //     });

    //     it('should fail for expect reasons', function() {
    //         var expected = { 
    //             name: { 
    //                 first: { 
    //                     message: 'The value must be populated.',
    //                     type: 'not_populated',
    //                     value: undefined },
    //                 second: { 
    //                     message: 'The value must be populated.',
    //                     type: 'not_populated',
    //                     value: undefined } },
    //             dateOfBirth: { 
    //                 message: 'The value must be populated.',
    //                 type: 'not_populated',
    //                 value: undefined } 
    //         };

    //         var comparison = compare(result, expected);
    //         assert.isTrue(comparison.equal,  "Unexpected difference: " + JSON.stringify(comparison.differences));
    //     });
    // });

    // TODO - Cycles in rules objects
    // TODO - Multiple level rules objects
});