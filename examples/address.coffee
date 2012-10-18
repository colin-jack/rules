log = require('util').log
inspect = require('util').inspect
validatron = require('./../lib/validatron')
mustBe = require('./../lib/mustBe')

invalidAddress = { 
  streetOne : "45 belch place"
  streetTwo : "Unfortunately this is a bit too long, blathering on"
  streetThree : "too short"
  town : undefined
  postcode: "HJG" 
}

addressSchema = {
  streetOne: mustBe().populated()
  streetTwo: -> @.populated().string( minLength: 10, maxLength : 10 )
  streetThree: -> @.populated().string( minLength : 10, maxLength: 20) 
  town: -> @.populated()
  # TODO: postcode using regex
}

result = validatron(invalidAddress, addressSchema);

log(inspect(result));