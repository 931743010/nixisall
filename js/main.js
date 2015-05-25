require.config({
    baseUrl : "js",
    paths : {
        "common" : "common",
        "jquery" : "lib/jquery",
        "canvas" : "mod/canvas",
        "home"   : "app/home"
    }
});
require(loadConfig,function($,dep){
    var noop = function(){};
});

