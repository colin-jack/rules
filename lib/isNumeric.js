module.exports = function(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}