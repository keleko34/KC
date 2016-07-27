// require.js looks for the following global when initializing
var require = {
    baseUrl: ".",
    paths: {
        /*"bootstrap":            "assets/bower_modules/components-bootstrap/js/bootstrap.min",*/
        "crossroads":           "assets/bower_modules/crossroads/dist/crossroads.min",
        "hasher":               "assets/bower_modules/hasher/dist/js/hasher.min",
        /*"jquery":               "assets/bower_modules/jquery/dist/jquery.min",*/
        "knockout":             "assets/bower_modules/knockout/dist/knockout",
        "knockout-projections": "assets/bower_modules/knockout-projections/dist/knockout-projections.min",
        "signals":              "assets/bower_modules/js-signals/dist/signals.min",
        "text":                 "assets/bower_modules/requirejs-text/text",
        "css":                  "assets/bower_modules/require-css/css.min",
        "knockout.punches":     "assets/bower_modules/knockout.punches/knockout.punches.min",
        "knockout-postbox":     "assets/bower_modules/knockout-postbox/build/knockout-postbox.min",
        "kb":                   "assets/bower_modules/kb/KB/Build/KB"
    },
    shim: {
        "bootstrap": { deps: ["jquery"] }
    }
};
