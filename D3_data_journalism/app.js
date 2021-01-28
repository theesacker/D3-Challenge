// @TODO: YOUR CODE HERE!
// Define SVG dimensions
var svgWidth = 950;
var svgHeight = 500;

var margin = {
    top:50,
    right:50,
    bottom:50,
    left:50
};

// Define the "workspace area"
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select area of webpage the graph goes and set dimensions

var svg = d3.select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);


// Append a group to the SVG area
var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left},${margin.top})`);

// Access the data
d3.csv("data.csv").then(function(npData){
    console.log(npData)
    npData.forEach(function(data){
      data.poverty = +data.poverty
      data.healthcare = +data.healthcare
      data.abbr = data.abbr
      data.state = data.state
      // console.log(data.health)
      // console.log(data.poverty)


   }); 
var xScalePoverty = d3.scaleLinear()
.domain([8,d3.max(npData,function(d){
  return +d.poverty;
})])
.range([0, chartWidth]);

var yScaleHealthCare = d3.scaleLinear()
.domain([0, d3.max(npData, function(d){
  return +d.healthcare;
})])
.range([chartHeight,0]);
// ---------------------------------------------------------------
// console.log(yScaleHealthCare);
// console.log(xScalePoverty);
// // Scales and axes
var bottomAxis = d3.axisBottom(xScalePoverty)
// // .tickFormat()
var leftAxis = d3.axisLeft(yScaleHealthCare)
// Add x-Axis
chartGroup.append("g")
    // .classed("axis", true)
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);
// // Add y_axis
chartGroup.append("g")
.classed("axis", true)
.call(leftAxis);

// Line generators
var drawLine = d3.line()
.x((d,i) => xScalePoverty(i))
.y(d => yScaleHealthCare(d))
// console.log(drawLine(npData));
// // append path for lines
chartGroup.append("path")
.attr("d", (drawLine(npData)));


// Create circles to plot
circlesGroup = chartGroup.selectAll("circle")
.data(npData)
.enter()
.append("circle")
.attr("cx", (d,i) => xScalePoverty(d.poverty))
.attr("cy", d => yScaleHealthCare(d.healthcare))
.attr("r", "15")
.classed("stateCircle", true);

// Create State Abbreviations
chartGroup.selectAll("text")
.data(npData)
.enter()
.append("text")
.attr("x", (d,i) => xScalePoverty(d.poverty))
.attr("y", d => yScaleHealthCare(d.healthcare-.30))
.classed("stateText", true)
.text(d => d.abbr)
.on("mouseover", function(d) {
  toolTip.show(d);
})
.on("mouseout", function(d,i) {
  toolTip.hide(d);
});


// Create x Axis titles
chartGroup.append("text")
.attr("transform", `translate(${chartWidth / 2},${chartHeight + margin.top -5})`)
.attr("text-anchor", "middle")
.attr("font-size", "16px")
.attr("fill", "blue")
.text("In Poverty(%)");

// Create Y Axis
chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("x", 0-chartHeight/2)
.attr("y", 22-margin.left)
.attr("text-anchor", "middle")
.attr("font-size", "16px")
.attr("fill", "blue")
.text("Lacks Healthcare(%)");



// Create Tooltip
var toolTip = d3.tip()
.attr("class", "d3-tip")
.offset([-8, 0])
.html(function(d){
  return(`${d.state} <hr> Healthcare (%) ${d.healthcare} <hr> Poverty ${d.poverty}`)
});
// create tooltip in chartGroup
chartGroup.call(toolTip);

// create Mouseover listeners

circlesGroup.on("mouseover", function(d){
  toolTip.show(d, this);
})
.on("mouseout", function(d){
  toolTip.hide(d)
});


});