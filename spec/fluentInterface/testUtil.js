var assert = require('chai').assert;
var rules = require('./../../lib/rules')

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

    describe("When date of birth does not need to be populated and is not", function() {
        var noDateOfBirth = { };

        shouldPassValidation(noDateOfBirth, validationDefinitions.dateOptional)
    });

    describe("When date of birth must be a date but is invalid", function() {
        var noDateOfBirth = { dateOfBirth: "2005, 12, 899"};

        shouldHaveSingleError(noDateOfBirth, validationDefinitions.dateRequired, "dateOfBirth", "not_a_date")
    });

    describe("When date of birth must be atleast one year ago but is not", function() {
        var bornNow = { dateOfBirth: new Date() };

        shouldHaveSingleError(bornNow, validationDefinitions.dateOfBirthMoreThanYearAgo, "dateOfBirth", "outside_date_range")
    });

    describe("When date of birth must be atleast one year ago and it is actually a long time in the past", function() {
        var ancient = { dateOfBirth: new Date(-500000) };

        shouldPassValidation(ancient, validationDefinitions.dateOfBirthMoreThanYearAgo)
    });

    describe("When array of friends must be populated but is empty", function() {
        var norman = { friends: [] };

        shouldHaveSingleError(norman, validationDefinitions.requiredArrayOfFriends, "friends", "not_populated")
    });

    describe("When array of friends must be populated but is not an array", function() {
        var norman = { friends: "bob" };

        shouldHaveSingleError(norman, validationDefinitions.requiredArrayOfFriends, "friends", "not_an_array")
    });

    describe("When array of friends must be populated and is", function() {
        var withFriends = { friends : ["bob", "frank"] };

        shouldPassValidation(withFriends, validationDefinitions.requiredArrayOfFriends)
    });

    describe("When age must be an integer and is", function() {
        var withIntegerAge = { age: 15 };

        shouldPassValidation(withIntegerAge, validationDefinitions.integerAge)
    });

    describe("When age must be an integer and is not", function() {
        var withNonIntegerAge = { age: 15.5 };

        shouldHaveSingleError(withNonIntegerAge, validationDefinitions.integerAge, "age", "not_an_integer")
    });

    describe("When age must be an integer and is not even numeric", function() {
        var withNonIntegerAge = { age: "bob" };

        shouldHaveSingleError(withNonIntegerAge, validationDefinitions.integerAge, "age", "not_numeric")
    });
};

var validate = function(toValidate, definition) {
    return rules.apply(toValidate, definition);
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
        assert.isDefined(result[property]);
    });

    it("Should notify you the value must be populated", function() {
        assert.equal(result[property].type, error);
    });
};

var shouldPassValidation = function(toValidate, validationDefinition) {
    var result;

    beforeEach(function() {
        result = validate(toValidate, validationDefinition);
    });

    it("Should not raise any error", function() {
        assert.isUndefined(result);
    });
};

module.exports = {
    runBasicTests : runBasicTests,
    shouldHaveSingleError : shouldHaveSingleError,
    shouldPassValidation : shouldPassValidation
}