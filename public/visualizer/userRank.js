define(function() {

    return function(tile, user) {

        an.data("co.torri.dod.analysis.CheckinsPerAuthorAnalyzer", function(checkins) {


            an.data("co.torri.dod.analysis.ModificationPerAuthorAnalyzer", function(modifications) {

                var h3 = $("<h3>User Rank</h3>")
                tile.element.append(h3);

                var checkinsRank = checkins.map(function(e,i) {
                    return {rank: i + 1, obj: e};
                }).filter(function(e) {
                    return e.obj.author == user;
                })[0];

                var modificationsRank = modifications.map(function(e,i) {
                    return {rank: i + 1, obj: e};
                }).filter(function(e) {
                    return e.obj.author == user;
                })[0];

                var div = $("<div class=\"content\"></div>");
                tile.element.append(div);

                div.append("<p>Checkins (<span>" + checkinsRank.obj.checkins + "</span>):</p>");
                div.append("<p class=\"info\" >#" + checkinsRank.rank + "</p>");

                div.append("<p>Line Changes (<span class=\"added\">" + modificationsRank.obj.added + "</span>, <span class=\"removed\">" + modificationsRank.obj.removed + "</span>):</p>");
                div.append("<p class=\"info\" >#" + modificationsRank.rank + "</p>");

            });

        });
    };
});