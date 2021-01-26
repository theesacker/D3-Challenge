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
});

// Prep and clean data

// Scales and axes

