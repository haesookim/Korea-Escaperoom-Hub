var mouselocation;
var tooltip = d3.select(".tooltip");

d3.select('body').on('mousemove', function(){
    mouselocation = d3.mouse(d3.select('body').node());
    tooltip.style('display', 'block')
        .style("left", mouselocation[0]+110+"px")
        .style("top", mouselocation[1]+10+"px");
})

