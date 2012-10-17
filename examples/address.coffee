log = require('util').log
inspect = require('util').inspect
validatron = require('./../lib/validatron')
mustBe = require('./../lib/mustBe')

invalidAddress = { 
  streetOne : "45 belch place"
  streetTwo : ""
  town : undefined
  postcode: "HJG" 
}

addressSchema = {
  streetOne: mustBe().populated() #.string(maxLength: 50)
  streetTwo: -> @.populated() #.string(maxLength: 50)
  streetThree: -> @ #.string(maxLength: 50)
  town: -> @.populated()
  # TODO: postcode using regex
}

result = validatron(invalidAddress, addressSchema);

log(inspect(result));