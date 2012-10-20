// var failureType = require('./../../failureType')
// var hasValue = require('./../../hasValue')

// var createFailureDescription = function(value, message) {
//     return { message: message, type: failureType.outsideDateRange, value : value }
// };

// var validate = function(value, after, before) {
//     if (value > before) {
//         return createFailureDescription(value, "The value must be before " + before + ".");
//     }

//     if (value < after) {
//         return createFailureDescription(value, "The value must be after " + after + ".");
//     }
// }

// var unsuitableConstraint = function(constraint) {
//     return constraint !== undefined && ;
// }

// var validateConfig = function(config) {
//     if (unsuitableConstraint(config.after)) {
//        throw new Error("The 'after' value must be a number.");
//     }

//     if (unsuitableConstraint(config.before)) {
//        throw new Error("The 'before' value must be a number.");
//     }

//     if ((config.after !== undefined && config.before !== undefined) && config.after >= config.before) {
//         throw new Error("Min must be less than before.");   
//     }
// }

// var create = function(config) {
//     validateConfig(config);

//     return function(value) {
//         return validate(value, config.after, config.before);
//     }
// }

// var handles = function(config) {
//     return (config.after !== undefined || config.before !== undefined);
// }

// module.exports = {
//     create : create,
//     handles: handles
// }