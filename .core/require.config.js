// require.js looks for the following global when initializing
var require = {
    baseUrl: ".",
    paths: {
        "bootstrap":            "assets/bower_modules/components-bootstrap/js/bootstrap.min",
        "crossroads":           "assets/bower_modules/crossroads/dist/crossroads.min",
        "hasher":               "assets/bower_modules/hasher/dist/js/hasher.min",
        "jquery":               "assets/bower_modules/jquery/dist/jquery",
        "knockout":             "assets/bower_modules/knockout/dist/knockout",
        "knockout-projections": "assets/bower_modules/knockout-projections/dist/knockout-projections",
        "signals":              "assets/bower_modules/js-signals/dist/signals.min",
        "text":                 "assets/bower_modules/requirejs-text/text",
        "css":                  "assets/bower_modules/requirejs-css/css"
    },
    shim: {
        "bootstrap": { deps: ["jquery"] }
    }
};
