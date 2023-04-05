// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 680 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


  // load data
  var data = d3.csv("https://raw.githubusercontent.com/ShagunDwivedi/DataVis/master/auto-mpg-copy.csv", function(error, data) {

    // change string (from CSV) into number format
    data.forEach(function(d) {
      d['model year'] = d['model year'];
      d.displacement = d.displacement;
      d.horsepower = d.horsepower;
      console.log(d['model year'],d.horsepower,d.displacement);
    });

  // set scales
  var x = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return d['model year']; }))
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  var y = d3.scaleLinear()
    .domain([0, 300])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#4285F4")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d['model year']) })
        .y(function(d) { return y(d.horsepower) })
        )
    
    svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#ea4335")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(function(d) { return x(d['model year']) })
      .y(function(d) { return y(d.displacement) })
      )

    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width-275)
    .attr("y", height + 30)
    .text("Model Year");
  });

