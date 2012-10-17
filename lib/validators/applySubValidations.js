module.exports = function(subValidations, value) {
    if (!subValidations) return;
    
    for (var i = 0, len = subValidations.length; i < subValidations.length; i++) {
        var subValidator = subValidations[i];
        var result = subValidator(value);

        if (result) return result;
    }
};