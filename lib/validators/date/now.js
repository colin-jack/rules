var moment = require('moment');

module.exports = {
    // Key will indicate what we're adding (e.g. "years")
    add: function(key, value) {
        return function() {
            return moment().add(key, value);
        }
    },
    subtract: function(key, value) {
        return function() {
            return moment().subtract(key, value);
        }  
    }
}