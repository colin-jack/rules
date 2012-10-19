var assert = require('chai').assert;
var regexValidator = require('./../../testFixture').require('regexValidator');

describe('regex validator', function() {
    describe("When config has unsupported values", function() {
        it("should throw exception", function() {
            var create = function() {
                regexValidator.create({bob: "yes", bill: 5});
            }


            var message =/Unexpected configuration values provided \(bob\/bill\). Only pattern\/flags supported./

            assert.throws(create, message);
        });
    });

     describe("When config is missing pattern", function() {
        it("should throw exception", function() {
            var create = function() {
                regexValidator.create({ flags: "foo" });
            }

            assert.throws(create, /The 'pattern' value must be the Regex pattern to use./);
        });
    });
});