var ensureFluentInterface = require('./fluentInterface/ensureFluentInterface')

var ensure = function(value, property) {
    var toReturn = Object.create(ensureFluentInterface);

    toReturn.value = value;
    toReturn.property = property;

    return toReturn;
};

module.exports = ensure;
