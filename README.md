rules (node.js)
==========
[![Build Status](https://travis-ci.org/colin-jack/rules.png)](https://travis-ci.org/#!/colin-jack/rules)

A tiny rules framework that can be used to validate any value, either by you creating a rules/schema object or applying validations to a single value. In both cases a fluent interface is used.
## Samples
### Schema
You create an object to declare the rules/invariants you want to apply (something akin to a schema). A fluent interface makes it easy to specify the invariants for each property:

```js
var nameRules = {
    first  : mustBe().populated().string({ minLength: 5, maxLength: 20}), [1]
    second : mustBe().populated().string({ minLength: 5, maxLength: 20}),
}

var personRules = {
    name:        nameRules,
    weight:      mustBe().populated().numeric({min : 0, max: 130}),
    dateOfBirth: function() { 
        this.populated().date({ before: now.subtract("years", 1) }); 
    } [2]
}
````
As shown you can access this fluent interface using two approaches:

* [1] mustBe() - Acts as the entry point to the fluent interface.
* [2] function - 'this' inside the function being the entry point to the fluent interface.

The function based approach is designed primarily for use with CoffeeScript:
```coffeescript
# This schema is not showing how to validate a real address, it just shows a few validators
addressRules = {
  streetOne: mustBe().populated()
  streetTwo: -> @.populated().string( minLength: 10, maxLength : 50 ) 
  streetThree: -> @.populated().string( minLength : 10, maxLength: 50) 
  town: -> @.populated()
  postCode: -> @.populated().matchFor(/.../)
}
```
### Inline Validation
The same validators are available for use validating individual values:
```js
var doSomeStuff = function(name, age) {
    ensure(name).populated().string();
    ensure(age, "age").integer();

    ...
}
```

### Triggering validation
You trigger validation using:

    result = rules.apply(person, personRules)

The returned object has the per-property details of any validation failures, e.g.:
```js
{ 
    name: { 
        first: { 
            message: 'The value must be populated.',
            type: 'not_populated',
            value: '' 
        },
        second: { 
            message: 'The value must be populated.',
            type: 'not_populated',
            value: undefined } 
        },
    weight: { 
        message: 'The value must be populated.',
        type: 'not_populated',
        value: undefined 
    } 
}
```
Note in this case both the first name (e.g. person.name.first) and second name (person.name.second) needed to be populated, along with the weight.

## Validators
The framework comes with several validators, to understand them further you may want to run the examples.

* ```populated``` - Checks the value is not ```null```, ```undefined```, ```""```, or an empty array.
* ```array```
* ```numeric``` - Optionally you can also pass in object with ```min``` and/or ```max``` values
* ```integer```
* ```matchFor``` - You can pass in an object with ```pattern``` and optionally ```flags```, alternatively you can pass in the ```RegExp``` object to use.
* ```date``` - Optionally you can specify that the date must be ```before``` and/or ```after``` specified dates. To make this easier you use ```now.add``` or ```now.subtract``` to specify the dates to use for ```before```/```after```.
* ```string``` - Optionally you can pass in ```minLength``` and/or ```maxLength```.

## Examples
The project comes with examples in the examples directory.

## Tests

    mocha -R spec spec/testFixture spec/ --recursive

## Future
* Numeric validators - >, <, >=, <=
* Date validator - Support now()
* boolean validator
* enum style validator - valueIn(list), valueNotIn(list).
* Potentially UMD support
* Trying to apply multiple of same validator, multiple type validators (integer and string, numeric and boolean), regex with anything other than string
* Ensure interface e.g. ensure(5).populate().numeric(), allowing direct validation of single values
* API for throwing
* Cyclical rules objects warning
* Numeric validator - failing if passed "15.5"