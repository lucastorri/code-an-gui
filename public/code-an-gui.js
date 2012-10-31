var an = (function() {
    var data = function(analyzer, onData) {
        $.get("/data/" + analyzer, function(d) {
            onData(d.data, d.desc);
        });
    };

    return {
        data: data
    };
})();