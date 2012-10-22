var assert = require('chai').assert;
var stringLengthValidator = require('./../../../testFixture').require('stringLengthValidator');

describe('string length validator', function() {
    describe('When you create validator and only provide minimum', function() {
        it('should behave as if maximum is unbounded', function() {
            var underTest = stringLengthValidator.create({ minLength: 0 });
            assert.isUndefined(underTest("012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789"));
        });
    });

    describe('When you create validator and only provide maximum', function() {
        it('should act as if minimum is zero', function() {
            var underTest = stringLengthValidator.create({ maxLength: 50 });
            assert.isUndefined(underTest(""));
        });
    });

    describe('When asking if it handles', function() {
        it('says yes if has minLength or maxLength', function() {
            assert.isTrue(stringLengthValidator.handles( {minLength: 5} ));
            assert.isTrue(stringLengthValidator.handles( {maxLength: 5} ));
            assert.isFalse(stringLengthValidator.handles( {bob: 5} ));
        });
    });
});