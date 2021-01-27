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
      data.pov = +data.poverty
      data.health = +data.healthcare
      // console.log(data.health)
      console.log(data.pov)


   }); 
var xScalePoverty = d3.scaleBand()
.domain([0,d3.max(npData,function(d){
  return +d.pov;
})])
.range([0, chartWidth]);

var yScaleHealthCare = d3.scaleLinear()
.domain([0, d3.max(npData, function(d){
  return +d.health;
})])
.range([chartHeight,0]);

// console.log(yScaleHealthCare);
// console.log(xScalePoverty);
// Scales and axes
var bottomAxis = d3.axisBottom(xScalePoverty)
// .tickFormat()
var leftAxis = d3.axisLeft(yScaleHealthCare)
// Add x-Axis
chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);
// Add y_axis
chartGroup.append("g")
call(leftAxis);

});