requirejs.config({
    baseUrl: 'visualizer'
});

var an = (function() {
    var data = function(analyzer, onData) {
        $.get("/data/" + analyzer, function(d) {
            onData(d.data, d.desc);
        });
    };

    var load = function(visualizers) {
        requirejs(visualizers, function() {
            for (var i = 0; i < arguments.length; i++) {
                var visualizer = arguments[i];
                visualizer.init($("#"+visualizers[i]));
            }
        });
    }

    return {
        data: data,
        load: load
    };
})();



an.load(["pairingRate"])