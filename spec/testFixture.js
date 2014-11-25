var chai = require('chai');

// TODO: Eventually remove this.
global.rulesLib = require('./../lib/namespace')

module.exports = {
    assert: chai.assert,
    rulesLib: global.rulesLib
}