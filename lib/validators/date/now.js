var moment = require('moment');

var throwIfKeyOrValueInappropriate = function(key, value) {
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