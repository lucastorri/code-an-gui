define(function() {

    return function(tile, project) {
        project = project.toUpperCase();

        an.data("co.torri.dod.analysis.PairingRateAnalyzer", function(data) {

          tile.title("Pairing");

          data = data.filter(function(d) { return d.project == project; });

          var width = tile.width(),
            height = tile.height(),
            radius = Math.min(width, height) / 2;

          var color = d3.scale.ordinal()
              .range(["#98abc5", "#8a89a6"]);

          var arc = d3.svg.arc()
              .outerRadius(radius - 10)
              .innerRadius(0);

          var pie = d3.layout.pie()
              .sort(null)
              .value(function(d) { return d.nstories; });

          var svg = d3.select(tile.id).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

          var g = svg.selectAll(".arc")
              .data(pie(data))
              .enter().append("g")
              .attr("class", "arc");

          g.append("path")
              .attr("d", arc)
              .attr("class", function(d) { return "pairing " + d.data.pairing; });

          g.append("text")
              .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
              .attr("dy", ".35em")
              .style("text-anchor", "middle")
              .text(function(d) { return d.data.pairing; });

        });
    };

});
