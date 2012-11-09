define(function() {
    return function(element, workspace) {
        an.data("co.torri.dod.analysis.CommitersPerWorkspacePerMonthAnalyzer", function(data) {

            var h3 = d3.select("#"+element.attr("id")).append("h3")
              h3.text("Unique Commiters per Month");

            var pacmanData = data.filter(function(e) {return e.workspace == workspace; });

            var margin = {top: 10, right: 10, bottom: 30, left: 40},
                width = element.width() - margin.left - margin.right,
                height = element.height() - margin.top - margin.bottom;

            var formatPercent = d3.format("");

            var x = d3.scale.ordinal()
                .rangeRoundBands([0, width], .1);

            var y = d3.scale.linear()
                .range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .tickFormat(formatPercent);

            var svg = d3.select("#"+element.attr("id")).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


            pacmanData.forEach(function(d) {
                d.commiters = +d.commiters;
            });

            x.domain(pacmanData.map(function(d) { return d.month + "-" + d.year.toString().substring(2); }));
            y.domain([0, d3.max(pacmanData, function(d) { return d.commiters; })]);

            svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);

            svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Commiters");

            svg.selectAll(".bar")
              .data(pacmanData)
            .enter().append("rect")
              .attr("class", "bar")
              .attr("x", function(d) { return x(d.month + "-" + d.year.toString().substring(2)); })
              .attr("width", x.rangeBand())
              .attr("y", function(d) { return y(d.commiters); })
              .attr("height", function(d) { return height - y(d.commiters); });



        });
    };
});