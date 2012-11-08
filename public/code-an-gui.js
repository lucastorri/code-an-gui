var an = (function() {
    requirejs.config({
        baseUrl: '/visualizer'
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
    var token = location.pathname.match($(["/project/(.*)", "/user/(.*)", "/workspace/(.*)"])
        .filter(function(i,regex) { return location.pathname.match(regex); })[0])[1] || "";

    var visualizers = $("#visualizers").find("div").map(function(i,e) { return e.id; });
    requirejs(visualizers.toArray(), function() {
        $(arguments).each(function(i, visualizer) {
            visualizer($("#"+visualizers[i]), token);
        });
    });

    $(function(){
        $('#container').masonry({
            itemSelector : '.tile',
            columnWidth : 300
        });
    });
});