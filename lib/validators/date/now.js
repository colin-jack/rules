var moment = require('moment');
var _u = require('underscore');

var SupportedKeys = ["years", "y", "months", "M", "weeks", "w", "days", "d", "hours", "h", "minutes", "m", "seconds", "s", "milliseconds", "ms"];

var throwIfKeyOrValueInappropriate = function(key, value) {
    if (typeof value !== 'number') {
        throw new Error("The value passed as the second argument to now must be a moment/date/date string.")
    }

    if (_u.contains(SupportedKeys, key) == false) {
        throw new Error("The key is not supported. Only " + SupportedKeys.join('/') + " supported.");
    }
};

module.exports = {
    // Key will indicate what we're adding (e.g. "years")
    add: function(key, value) {
        throwIfKeyOrValueInappropriate(key, value);

        return function() {
            return moment().add(key, value);
        }
    },
    subtract: function(key, value) {
        throwIfKeyOrValueInappropriate(key, value);

        return function() {
            return moment().subtract(key, value);
        }  
    }
}