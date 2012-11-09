define(function() {

    return function(tile, project) {
        project = project.toUpperCase();

        an.data("co.torri.dod.analysis.PairingRateAnalyzer", function(data) {

          var h3 = d3.select(tile.id).append("h3")
          h3.text("Pairing");

          data = data.filter(function(d) { return d.project == project; });



        });
    };

});
