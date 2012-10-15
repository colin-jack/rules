// See https://github.com/umdjs/umd, specifically https://github.com/umdjs/umd/blob/master/returnExports.js
umdDefine(this, 'populatedValidator', ['failureType'], function (failureType) {
    return function(value) {
        if (value) {
            return;
        }

        return {
            message: "The value must be populated.",
            type: failureType.notPopulated,
            value : value
        }
    };
});