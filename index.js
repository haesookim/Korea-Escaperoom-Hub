//download the data
d3.csv("/data/ldhdata_clean.csv", function(room){
    return{
        theme : room.themeName,
        spec_location : room.specific,
        franchise_id : room.franchise + " " + room.label,
        overall_score : room.score,
        difficulty : room.difficulty,
        completeness : room.completeness
    }
}).then(function(data){
    console.log(data[0]);
})

//tooltip displays
var mouselocation;
var tooltip = d3.select(".tooltip");
var mappath = d3.selectAll(".map").selectAll("path");

mappath.on('mouseenter', function(){
    tooltip.style('display', 'block');
    let textID = this.id;
    tooltip.select(".tooltip-city").html("<strong>"+textID+"</strong>");
}).on('mousemove', function(){
    mouselocation = d3.mouse(d3.select('body').node());
    tooltip.style("left", mouselocation[0]+120+"px")
        .style("top", mouselocation[1]+10+"px");
}).on('mouseleave', function(){
    tooltip.style('display', 'none');
})

