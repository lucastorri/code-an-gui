var an = (function() {
    requirejs.config({
        baseUrl: 'visualizer'
    });

    var data = function(analyzer, onData) {
        $.get("/data/" + analyzer, function(d) {
            onData(d.data, d.desc);
        });
    };

    return {
        data: data
    };
})();


$(function() {
    var visualizers = $("#visualizers").find("div").map(function(i,e) { return e.id; });
    requirejs(visualizers, function() {
        $(arguments).each(function(i, visualizer) {
            visualizer.init($("#"+visualizer));
        });
    });

    $(function(){
        $('#container').masonry({
            itemSelector : '.tile',
            columnWidth : 300
        });
    });
});