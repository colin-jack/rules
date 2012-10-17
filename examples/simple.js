require('./../umdDefine')
var validatron = require('./../validatron');
var mustBe = require('./../mustBe');

var veryInvalid = { name: "", "age" : -1, address: null, weight: 80 };

var validationDefinition = {
    age: mustBe().populated().numeric({minimum : 0, maximum: 130}),
    name: mustBe().populated().string({maxLength: 50}),
    //address: mustBe().populated().
    awesomeness: function() { this.populated().numeric(); }
}

var result = validatron(veryInvalid, validationDefinition);

require('util').log(result);