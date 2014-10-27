(function() {
  var addressSchema, inspect, invalidAddress, log, mustBe, result, rules, ukPostCodeRegex;

  log = require('util').log;

  inspect = require('util').inspect;

  rules = require('./../lib/rules');

  mustBe = require('./../lib/mustBe');

  ukPostCodeRegex = /(GIR 0AA|[A-PR-UWYZ]([0-9][0-9A-HJKPS-UW]?|[A-HK-Y][0-9][0-9ABEHMNPRV-Y]?) [0-9][ABD-HJLNP-UW-Z]{2})/;

  invalidAddress = {
    streetOne: "45 belch place",
    streetTwo: "Unfortunately this is a bit too long, blathering on",
    streetThree: "too short",
    town: void 0,
    postCode: "EHB 2AD"
  };

  addressSchema = {
    streetOne: mustBe().populated(),
    streetTwo: function() {
      return this.populated().string({
        minLength: 10,
        maxLength: 50
      });
    },
    streetThree: function() {
      return this.populated().string({
        minLength: 10,
        maxLength: 50
      });
    },
    town: function() {
      return this.populated();
    },
    postCode: function() {
      return this.populated().matchFor(ukPostCodeRegex);
    }
  };

  result = rules.apply(invalidAddress, addressSchema);

  log(inspect(result));

}).call(this);

//# sourceMappingURL=address.js.map
