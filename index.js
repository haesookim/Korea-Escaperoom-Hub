/* Draw the map */
var mapwidth = 800;
var mapheight = 600;

var svg = d3.select(".map").append("svg")
    .attr("width", mapwidth)
    .attr("height", mapheight);

var seoulmap = svg.append("g")
    .attr("id", "seoulmap");

var path = d3.geoPath();

d3.json("seoul_municipalities_topo_simple.json", function (error, seoul) {
    if (error) throw error;
    var features = topojson.feature(seoul, seoul.objects.seoul_municipalities_geo).features;

    seoulmap.selectAll("path")
        .data(features)
        .enter().append("path")
        .attr("d", path);

    /*seoulmap.selectAll("path")
        .data(features)
        .enter().append("path")
        .attr("class", function (d) { console.log(); return "municipality c" + d.properties.SIG_ENG_NM })
        .attr("d", path);

    seoulmap.selectAll("text")
        .data(features)
        .enter().append("text")
        .attr("transform", function (d) { return "translate(" + path.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .attr("class", "municipality-label")
        .text(function (d) { return d.properties.SIG_KOR_NM; })*/
});


//download the data
var fulldata = d3.csv("/data/ldhdata_clean.csv", function (room) {
    //clean it up a bit
    return {
        theme: room.themeName,
        spec_location: room.specific,
        franchise_id: room.franchise + " " + room.label,
        suggestion: +room.score,
        difficulty: +room.difficulty,
        completeness: +room.completeness
    }
}).then(function (data) {
    var count = d3.nest()
        .key(function (room) { return room.spec_location; })
        .rollup(function (room_group) {
            return room_group.length;
        }).entries(data);
});

var seouldata = d3.csv("/data/seoul-data.csv", function (city) {
    return +city.number;
})

seouldata.then(function () {

    var colorScale = d3.scaleThreshold()
        .domain([10, 20, 30, 40, 50])
        .range(["#D3DEF8", "#acb8d8", "#8593b9", "#5e6d99", "#37487a", "#10235b"]);

})

//tooltip displays
var mouselocation;
var tooltip = d3.select(".tooltip");
var mappath = d3.selectAll(".map").selectAll("path");

mappath.on('mouseenter', function () {
    tooltip.style('display', 'block');
    let textID = this.id;
    let locinfo;
    tooltip.select(".tooltip-city")
        .html("<strong>" + textID + "</strong></br>");

    tooltip.select(".tooltip-num")
        .html("# of Themes Visited: ");
}).on('mousemove', function () {
    mouselocation = d3.mouse(d3.select('body').node());
    /* 
    * this doesn't work best on responsive web :
    * change the pixel specifications to something else
    */
    tooltip.style("left", mouselocation[0] + 160 + "px")
        .style("top", mouselocation[1] + 10 + "px");
}).on('mouseleave', function () {
    tooltip.style('display', 'none');
});
