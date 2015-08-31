// ref: http://www.ringabell.org/en/un-simple-guide-pour-debuter-avec-requirejs/
// load third party libraries that aren’t defined as Require modules
require.config({
    paths: {
        'jQuery': 'extern/jquery',
        'Q': 'extern/q',
        'ko': 'extern/knockout',
        'io':'/socket.io/socket.io' // socket io adds a path 'socket.io' to the express route
    },
    shim: {
        'jQuery': {
            exports: '$'
        },
        'Q': {
            exports: 'Q'
        },
        'ko': {
            exports: 'ko'
        },
        'io': {
            exports: 'io'
        }
    }
});

require(['client'], function(client){
});