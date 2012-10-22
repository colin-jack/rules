module.exports = function(value) {
    return value !== null && value !== undefined && value !== "" && (!Array.isArray(value) || value.length > 0);
}
