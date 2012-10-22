rules (node.js)
==========
Snpmall declarative rules framework desing primarily for use whne validating incoming data, such as JSON coming into services.

Instead of trying handle all your validation this framework focussing on making it easy to declare data-level invariants, similiar to the sorts of rules you could put in a schema.

### Samples
You create an object to declare the invariants you want to apply. A fluent interface makes it easy to specify the invariants for each property.

#####JavaScript
```js
var personRules = {
    name:        mustBe().populated().string( { minLength: 5, maxLength: 20} ), [1]
    weight:      mustBe().populated().numeric({min : 0, max: 130}),
    dateOfBirth: mustBe().date({ before: now.subtract("years", 1) })
}
````
#####CoffeeScript
```coffeescript
# This schema is not showing how to validate a real address, its just an example that makes it easy to test the framework
addressRules = {
  streetOne: mustBe().populated()
  streetTwo: -> @.populated().string( minLength: 10, maxLength : 50 ) [2]
  streetThree: -> @.populated().string( minLength : 10, maxLength: 50) 
  town: -> @.populated()
  postCode: -> @.populated().matchFor(/.../)
}
```
As shown you can access this fluent interface using twp approaces:

* [1] mustBe() - Acts as the entry point to the fluent interface.
* [2] function - 'this' inside the function being the entry point to the fluent interface.

#####Triggering validation
You trigger validation using:

    result = rules.apply(person, personRules)

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

Note that if you are using sublime you can get the alignment shown in the person example using the [sublime text alignment package](http://wbond.net/sublime_packages/alignment).

### Validators
The framework comes with several validators, to understand them further you may want to run the examples.

* ```populated``` - Checks the value is not ```null```, ```undefined```, ```""```, or an empty array.
* ```array```
* ```numeric``` - Optionally you can also pass in object with ```min``` and/or ```max``` values
* ```matchFor``` - You can pass in an object with ```pattern``` and optionally ```flags```, alternatively you can pass in the ```RegExp``` object to use.
* ```date``` - Optionally you can specify that the date must be ```before``` and/or ```after``` specified dates. To make this easier you use ```now.add``` or ```now.subtract``` to specify the dates to use for ```before```/```after```.
* ```string``` - Optionally you can pass in ```minLength``` and/or ```maxLength```.

### Tests
First install mocha: 

    npm install mocha -g

Run the tests:

    mocha -R spec spec/ -w -G --recursive -b

### TODO
* More validators
* UMD support
