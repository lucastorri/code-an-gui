var an = (function() {
    var data = function(analyzer, onData) {
        $.get("/data/" + analyzer, onData);
    };

    return {
        data: data
    };
})();