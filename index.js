var Winston = require('winston');
var Util = require('util');

var wrapFunc = function(oldFunc, startIndex) {
    startIndex = startIndex || 0;
    return function() {
        var args = Array.prototype.slice.call(arguments);
        for (var i = startIndex; i < args.length; i++){
            if (typeof args[i] !== 'string' && args[i] instanceof String === false) {
                args[i] = Util.inspect(arguments[i]);
            }
        }

        return oldFunc.apply(Winston, args);
    };
};

Winston.log = wrapFunc(Winston.log, 1);
Winston.info = wrapFunc(Winston.info);
Winston.error = wrapFunc(Winston.error);
Winston.debug = wrapFunc(Winston.debug);

module.exports = Winston;


