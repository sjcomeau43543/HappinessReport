function barChart(year){
  d3.selectAll("#happiness_bar").remove();

  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = 125 - margin.top - margin.bottom;

  var color = d3.scaleThreshold()
    .domain(d3.range(0, 10))
    .range(d3.schemeBlues[9]);

  // set the ranges
  var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
  var y = d3.scaleLinear()
            .range([height, 0]);

  // append the svg object to the body of the page
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select(".happyness_bar").append("svg")
      .attr("id", "happiness_bar")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  var tip = d3.select("body")
		.append("div")
  	.attr("class", "tooltip")
  	.style("opacity", 0);

  // get the data
  d3.csv("data/"+year+".csv", function(error, data) {
    if (error) throw error;

    data.filter(function(d){ if(d.happiness > 0){return d.happiness;}})
      // format the data
      data.forEach(function(d) {
        d.happiness = +d.happiness;
      });

    data.sort(function(x, y){return d3.descending(x.happiness, y.happiness);})

    // Scale the range of the data in the domains
    x.domain(data.map(function(d, i) { if(d.happiness > 0){ return d.code; }}));
    y.domain([0, d3.max(data, function(d) { return d.happiness; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .filter(function(d) { return d.happiness > 0 })
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.code); })
        .attr("width", x.bandwidth())
        .attr("y", "0px") //function(d) { return y(d.happiness); })
        .attr("height", "80px") //function(d) { return height - y(d.happiness); })
        .style("fill", function(d, i) {return color(d.happiness); })

      // tooltip on mouseover
      .on("mouseover", function(d) {
        d3.select(this)
        .attr('fill', 'blue');
        tip.transition()
            .duration(200)
            .style("opacity", .9);
            tip.text( d.code + " " + round(d.happiness, 3) )
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY-28) + "px");})

      // fade out tooltip on mouse out
      .on("mouseout", function(d) {
        d3.select(this)
        .attr('fill', 'black');
        tip.transition()
					.duration(50)
					.style("opacity", 0);
        });

    svg.append("text")
      .attr("x", "-40px")
      .attr("y", "-10")
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "middle")
      .text("Happiness");

  });
}

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
