

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

