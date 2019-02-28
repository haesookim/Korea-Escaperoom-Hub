/* Draw the map */
var width = window.innerWidth / 2;
var height = window.innerHeight;
var mappath;

var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);

var seoulmap = svg.append("g")
    .attr("id", "seoulmap")
    .attr("class", "map");

var projection = d3.geoMercator()
    .center([126.9895, 37.5651]) //lng, lat
    .scale(60000)
    .translate([width / 2, height / 2 - 50]);

var path = d3.geoPath().projection(projection);

var loadmap = d3.json("data/seoul_municipalities_topo_simple.json", function (error, data) {
    var features = topojson.feature(data, data.objects.seoul_municipalities_geo).features;
    seoulmap.selectAll("path")
        .data(features)
        .enter().append("path")
        .attr("class", function (d) { console.log(); return "municipality c" + d.properties.SIG_CD })
        .attr("id", function (d) { return d.properties.SIG_KOR_NM })
        .attr("d", path);
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
});

var seouldata = d3.csv("/data/seoul-data.csv", function (city) {
    return +city.number;
})

var colorScale = d3.scaleThreshold()
    .domain([10, 20, 30, 40, 50])
    .range(["#D3DEF8", "#acb8d8", "#8593b9", "#5e6d99", "#37487a", "#10235b"]);

//tooltip displays
var mouselocation;
var tooltip = d3.select(".tooltip");
/* need to fix */
tooltip (function(loadmap) {
    var mappath = d3.selectAll("path");
});

mappath.on('mouseenter', function () {
    tooltip.style('display', 'block');
    let textID = this.id;
    tooltip.select(".tooltip-city")
        .html("<strong>" + textID + "</strong></br>");

    tooltip.select(".tooltip-num")
        .html("# of Themes: ");
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
