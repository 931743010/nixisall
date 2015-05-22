require.config({
    baseUrl : "js",
    paths : {
        "common" : "common",
        "jquery" : "lib/jquery",
        "canvas" : "app/canvas"
    }
});
require(loadConfig,function($,common,a,b,c,d,e,f,g,h,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z){
    var len = arguments.length;
    var i = 2 ;
    for( ; i < len ; i++ ){
        arguments[i].init(common);
    }
});

