var assert = require('chai').assert;
var validatron = require('./../testFixture').require('validatron');

// When using the declarative approach we have two ways of specifying how to validate:
//    age: mustBe().populated()
//    age: function() { this.populated()}
// They are just wrappers for the same validation behavior though so the tests have been extracted out
// here so that they can be reused.
var runBasicTests = function(validationDefinitions) {
    describe("When numeric age property must be populated and is not", function()   
    {
        var withNoAge = { "age" : undefined, "name": null };

        shouldHaveSingleError(withNoAge, validationDefinitions.numericRequiredAge, "age", "not_populated")
    });

    describe("When numeric age property does not need to be populated and is not", function() {
        var withNoAge = { "age" : undefined};

        shouldPassValidation(withNoAge, validationDefinitions.numericOptionalAge)
    });

    describe("When numeric age property must be in range and is not", function() {
        var negativeAge = { "age" : -1 }

        shouldHaveSingleError(negativeAge, validationDefinitions.numericAgeWithRange, "age", "outside_range");
    });

    describe("When name property must be string and is not", function() {
        var numericName = { "name" : 5 }

        shouldHaveSingleError(numericName, validationDefinitions.requiredString, "name", "not_a_string");
    });

    describe("When phone number property must match regex and does not", function() {
        var invalidPhoneNumber = { "phoneNumber" : "0131 489 90" }

        shouldHaveSingleError(invalidPhoneNumber, validationDefinitions.phoneNumberMustMatchRegex, "phoneNumber", "regex_not_matched");
    });
};

var validate = function(toValidate, definition) {
    return validatron(toValidate, definition);
};

var shouldHaveSingleError = function(toValidate, validationDefinition, property, error) {
    var result;

    beforeEach(function() {
        result = validate(toValidate, validationDefinition);
    });

    it("Should have error for just expected property", function() {
        var invalidProperties = Object.keys(result);
        assert.equal(invalidProperties.length, 1);
        assert.notEqual(invalidProperties.indexOf(property), -1);
    });

    it("Should have one error for expected property", function() {
        assert.equal(result[property].length, 1);
    });

    it("Should notify you the value must be populated", function() {
        assert.equal(result[property][0].type, error);
    });
};

var shouldPassValidation = function(toValidate, validationDefinition) {
    var result;

    beforeEach(function() {
        result = validate(toValidate, validationDefinition);
    });

    it("Should not raise any error", function() {
        assert.equal(Object.keys(result).length, 0);
    });
};

module.exports = {
    runBasicTests : runBasicTests,
    shouldHaveSingleError : shouldHaveSingleError,
    shouldPassValidation : shouldPassValidation
}