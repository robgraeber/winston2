var Winston = require('winston');
var Util = require('util');

var wrapFunc = function(oldFunc) {
    return function() {
        var args = Array.prototype.slice.call(arguments);
        for (var i = 0; i < args.length; i++){
            if (typeof args[i] !== 'string' && args[i] instanceof String === false) {
                args[i] = Util.inspect(arguments[i]);
            }
        }

        return oldFunc.apply(Winston, args);
    };
};

Winston.log = wrapFunc(Winston.log);
Winston.info = wrapFunc(Winston.info);
Winston.error = wrapFunc(Winston.error);
Winston.debug = wrapFunc(Winston.debug);

module.exports = Winston;


