log = require('util').log
inspect = require('util').inspect
rules = require('./../lib/rules')
mustBe = require('./../lib/mustBe')

ukPostCodeRegex = /(GIR 0AA|[A-PR-UWYZ]([0-9][0-9A-HJKPS-UW]?|[A-HK-Y][0-9][0-9ABEHMNPRV-Y]?) [0-9][ABD-HJLNP-UW-Z]{2})/

invalidAddress = { 
  streetOne : "45 belch place"
  streetTwo : "Unfortunately this is a bit too long, blathering on"
  streetThree : "too short"
  town : undefined
  postCode: "EHB 2AD" 
}

addressSchema = {
  streetOne   : mustBe().populated()
  streetTwo   : -> @.populated().string( minLength: 10, maxLength : 50 )
  streetThree : -> @.populated().string( minLength : 10, maxLength: 50) 
  town        : -> @.populated()
  postCode    : -> @.populated().matchFor(ukPostCodeRegex)
}

result = rules.apply(invalidAddress, addressSchema);

log(inspect(result));