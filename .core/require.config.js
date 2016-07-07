// require.js looks for the following global when initializing
var require = {
    baseUrl: ".",
    paths: {
        "bootstrap":            "Assets/bower_modules/components-bootstrap/js/bootstrap.min",
        "crossroads":           "Assets/bower_modules/crossroads/dist/crossroads.min",
        "hasher":               "Assets/bower_modules/hasher/dist/js/hasher.min",
        "jquery":               "Assets/bower_modules/jquery/dist/jquery",
        "knockout":             "Assets/bower_modules/knockout/dist/knockout",
        "knockout-projections": "Assets/bower_modules/knockout-projections/dist/knockout-projections",
        "signals":              "Assets/bower_modules/js-signals/dist/signals.min",
        "text":                 "Assets/bower_modules/requirejs-text/text",
        "css":                  "Assets/bower_modules/require-css/css"
    },
    shim: {
        "bootstrap": { deps: ["jquery"] }
    }
};
