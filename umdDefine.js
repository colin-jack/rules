// Here we are using a variation the UMD approach from https://github.com/umdjs/umd/blob/master/returnExports.js
//
// We don't want to keep repeating this code in each file though so we hadd a single method on the global 
// object and then use it from each file, small polution of the global namespace to avoid a lot of repetition
// seems a decent tradeoff.
//
this.umdDefine = function(root, name, dependsOn, factory) {
    if (typeof exports === 'object') { 
    	module.exports = factory(require.apply(root, dependsOn)); 
    } else if (typeof define === 'function' && define.amd) { 
    	define(dependsOn, factory); 
    } else { 
    	var toPassThrough = [];

    	dependsOn.forEach(function(dependencyName) {
    		toPassThrough.push(root[dependencyName]);
    	});

    	root[name] = factory.apply(root, toPassThrough); 
    }
};