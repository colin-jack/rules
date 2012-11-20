// var assert = require('chai').assert;
// var rules = rulesLib.require('rules'),
//     mustBe = rulesLib.require('mustBe');

// describe('mustBe', function() {
//     var nameRules = {
//         first  : mustBe().populated().string(),
//         second : mustBe().populated().string()
//     }

//     describe('When you use mustBe.objectPassing with a rule object', function() {
//         it('should return a suitable validator', function() {
//             var created = mustBe().objectPassing(nameRules);
//             assert.isDefined(created.validate);
//         });
//     });
// });