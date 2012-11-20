global.rulesLib = require('./../lib/namespace');

module.exports = {
    rules: require('./lib/rules'),
    mustBe: require('./lib/mustBe'),
    now: require('./lib/validators/date/now')
}