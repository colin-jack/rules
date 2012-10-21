var moment = require('moment');

var throwIfKeyOrValueInappropriate = function(key, value) {
        // if (typeof value === 'number') {
    //     throw new Error("The value passed as the second argument to now must be a moment/date/date string.")
    // }

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