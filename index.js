
//download the data
var fulldata = d3.csv("/data/ldhdata_clean.csv", function(room){
    //clean it up a bit
    return{
        theme : room.themeName,
        spec_location : room.specific,
        franchise_id : room.franchise + " " + room.label,
        suggestion : +room.score,
        difficulty : +room.difficulty,
        completeness : +room.completeness
    }
}).then(function(data){
    var count = d3.nest()
        .key(function(room){return room.spec_location; })
        .rollup(function(room_group){
            return room_group.length;
        }).entries(data);
});
    /*
*/

var seouldata = d3.csv("/data/seoul-data.csv", function(city){
    return +city.number;
})

seouldata.then(function(){
    console.log(seouldata);

    var colorScale = d3.scaleThreshold()
        .domain([10, 20, 30, 40, 50])
        .range(["#D3DEF8", "#acb8d8", "#8593b9", "#5e6d99", "#37487a", "#10235b"]);

    d3.select("#seoulmap").selectAll("path")
        .data(seouldata)
        .attr("id", function(d){return d});

        console.log(d3.select("#seoulmap").selectAll("path"));
})

//tooltip displays
var mouselocation;
var tooltip = d3.select(".tooltip");
var mappath = d3.selectAll(".map").selectAll("path");

mappath.on('mouseenter', function(){
    tooltip.style('display', 'block');
    let textID = this.id;
    let locinfo;
    tooltip.select(".tooltip-city")
        .html("<strong>"+textID+"</strong></br>");
    
    tooltip.select(".tooltip-num")
        .html("# of Themes Visited: ");
}).on('mousemove', function(){
    mouselocation = d3.mouse(d3.select('body').node());
    /* 
    * this doesn't work best on responsive web :
    * change the pixel specifications to something else
    */
    tooltip.style("left", mouselocation[0]+160+"px")
        .style("top", mouselocation[1]+10+"px");
}).on('mouseleave', function(){
    tooltip.style('display', 'none');
});
