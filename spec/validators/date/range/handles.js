var assert = require('chai').assert;
var now = lib.require('now');
var moment = require('moment');
var dateRangeValidator = lib.require('dateRangeValidator');

describe('date range validator', function() {
    describe('When asking if it handles', function() {
        it('should say yes if has before or after value', function() {
            var currentTime = Date.now();

            assert.isTrue(dateRangeValidator.handles( { before: currentTime } ));
            assert.isTrue(dateRangeValidator.handles( { after: currentTime } ));
            assert.isFalse(dateRangeValidator.handles( { bob: currentTime } ));
        });
    });
});