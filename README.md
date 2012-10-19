validatron
==========
Very very early version of a small declarative validation framework.

### Samples
You declare what a valid instance of your object would look like in terms of invariants, a schema if you will:

#####JavaScript
```js
var personSchema = {
    age: mustBe().populated().numeric( {min : 0, max: 130} ),
    name: mustBe().populated(), 
    weight: function() { this.populated().numeric(); }
}
````
#####CoffeeScript
```coffeescript
addressSchema = {
  streetOne: mustBe().populated()
  streetTwo: -> @.populated()
  town: -> @.populated()
}
```
Note the two styles in the schema, ```mustBe()..``` or a function where ```this``` is the validation fluent interface.

#####Triggering validation
You trigger validation using:

    result = validatron(invalidAddress, addressSchema)

The returned object has the per-property details of any validation failures, e.g.:

```js
{ town: 
   [ { message: 'The value must be populated.',
       type: 'not_populated',
       value: undefined } ] 
}

```

### Examples
The project comes with examples in the examples directory:

    node examples/person
    coffee examples/address

### Tests
First install mocha: 

    npm install mocha -g

Run the tests:

    mocha -R spec spec/ -w -G --recursive -b

### TODO
* More validators
* UMD support
