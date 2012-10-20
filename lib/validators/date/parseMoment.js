var moment = require('moment');

var isSuitableType = function(toParse) {
    return Array.isArray(toParse) || typeof toParse === "string" || toParse instanceof Date;
};

module.exports = function(toParse) {
    if (isSuitableType(toParse) === false) return null;

    var parsed = moment(toParse);

    return parsed.isValid() ? parsed : null;
}