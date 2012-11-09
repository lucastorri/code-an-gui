var an = (function() {
    requirejs.config({
        baseUrl: '/visualizer'
    });

    var data = function(analyzer, onData) {
        $.get("/data/" + analyzer, function(d) {
            onData(d);
        });
    };

    return {
        data: data
    };
})();


$(function() {
    var Tile = function Tile(id) {
        if (!(this instanceof Tile)) return new Tile(id)
        this.id = "#" + id;
        this.element = $(this.id);
    };
    Tile.prototype = {
        width: function() { return this.element.width(); },
        height: function() { return this.element.height() - this.title().height(); },
        title: function(t) {
            if (t) {
                this.element.append("<h3>" + t + "</h3>");
            }
            return this.element.find("h3");
        }
    };


    var token = location.pathname.match($(["/project/(.*)", "/user/(.*)", "/workspace/(.*)"])
        .filter(function(i,regex) { return location.pathname.match(regex); })[0])[1] || "";

    var visualizers = $("#visualizers")
        .find("div")
        .map(function(i,e) { return e.id; })
        .filter(function(i,id) { return id != ""; });

    requirejs(visualizers.toArray(), function() {
        $(arguments).each(function(i, visualizer) {
            visualizer(Tile(visualizers[i]), token);
        });
    });

    $(function(){
        $('#container').masonry({
            itemSelector : '.tile',
            columnWidth : 300
        });
    });
});