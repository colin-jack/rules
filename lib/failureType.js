// See https://github.com/umdjs/umd, specifically https://github.com/umdjs/umd/blob/master/returnExports.js
umdDefine(this, 'failureType', [], function () {
    return {
    	notNumeric : "not_numeric",
    	notPopulated : "not_populated",
    	outsideRange: "outside_range"
    };
});