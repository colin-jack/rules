// A namespace is used so that reorganising the folder containing the code under test doesn't result in 
// lots of broken tests.
var requireNamespace = require('require-namespace');

module.exports = global.lib = requireNamespace.createSync('lib', __dirname + '/../lib/');