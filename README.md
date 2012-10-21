validatron
==========
Early version of a small declarative validation framework. Instead of trying handle all your validation this framework focussing on making it easy to declare invariants for incoming data and so takes on the role of schema and simple data validation. 

### Samples
You declare what a valid instance of your object would look like in terms of invariants, a schema if you will:

#####JavaScript
```js
var personSchema = {
    age: mustBe().populated().numeric( {min : 0, max: 130} ),
    name: mustBe().populated().string( { minLength: 5, maxLength: 20} ),
    weight: function() { this.populated().numeric(); }
}
````
#####CoffeeScript
```coffeescript
# This schema is not showing how to validate a real address, its just an example that makes it easy to test the framework
addressSchema = {
  streetOne: mustBe().populated()
  streetTwo: -> @.populated().string( minLength: 10, maxLength : 50 )
  streetThree: -> @.populated().string( minLength : 10, maxLength: 50) 
  town: -> @.populated()
  postCode: -> @.populated().matchFor(/.../)
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
