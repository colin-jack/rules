﻿// Useful if you want to debug some mocha tests in Visual Studio
var Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path');

var mocha = new Mocha({
    bail: true,
    timeout: false
});

// Then, you need to use the method "addFile" on the mocha
// object for each file.

var testDirectory = __dirname + "/spec/fluentInterface/";

// Here is an example:
fs.readdirSync(testDirectory).filter(function (file) {
    // Only keep the .js files
    return file.substr(-3) === '.js' && file.indexOf("ensure") !== -1;
}).forEach(function (file) {
    // Use the method "addFile" to add the file to mocha
    mocha.addFile(path.join(testDirectory, file));
});

// Now, you can run the tests.
mocha.run(function (failures) {
    process.on('exit', function () {
        debugger;
        process.exit(failures);
    });
});