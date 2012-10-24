// var assert = require('chai').assert;
// var rules = lib.require('rules'),
//     mustBe = lib.require('mustBe');

// describe('rules - apply', function() {
//     var nameRules = {
//         first  : mustBe().populated().string(),
//         second : mustBe().populated().string()
//     }

//     var simpleRules = {
//         name        : nameRules,

//         dateOfBirth : function() { this.date().populated() },

//         other       : function() { return "foo" },
//         yetAnother  : function() { return [] },
//         last        : { message: "irrelevant"}
//     }

//     describe('When you apply a simple set of rules to an object that meets them', function() {
//         it('should pass validation', function() {
//             var valid = { 
//                             name: { first: "bob", second: "marsh" }, 
//                             dateOfBirth: Date(-500) 
//                         };
//             var result = rules.apply(valid, simpleRules);
//             assert.equal(Object.keys(result).length, 0);
//         });
//     });

//     describe('When you apply a simple set of rules to an object that does not meet them', function() {
//         it('should fail validation', function() {
//             var invalid = { name: "" };
//             var result = rules.apply(invalid, simpleRules);
//             assert.equal(Object.keys(result).length, 3);
//         });
//     });

//     // TODO - Cycles in rules objects
//     // TODO - Multiple level rules objects
// });