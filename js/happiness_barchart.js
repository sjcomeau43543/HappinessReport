/*
  Functions and variables used by all bar chart functions
*/
var margin = {top: 5, right: 20, bottom: 10, left: 40},
    width = 960 - margin.left - margin.right,
    height = 125 - margin.left - margin.right;

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

//Happiness Bar Chart Function
function happinessBar(year){
  d3.selectAll("#happiness_bar").remove();

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
        .attr("class", function(d){return "bar " + d.code})
        .attr("x", function(d) { return x(d.code); })
        .attr("width", x.bandwidth())
        .attr("y", "0px") //function(d) { return y(d.happiness); })
        .attr("height", "75px") //function(d) { return height - y(d.happiness); })
        .style("fill", function(d, i) {return color(d.happiness); })

      // tooltip on mouseover
      .on("mouseover", function(d) {
        d3.selectAll("."+d.code)
          .attr('opacity', .2);

        d3.select(this)
        .attr('fill', 'blue');
        tip.transition()
            .duration(200)
            .style("opacity", .9);
            tip.text( d.code + " " +  d.country + ": " + round(d.happiness, 3) + "/10" )
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY-28) + "px");})

      // fade out tooltip on mouse out
      .on("mouseout", function(d) {
        d3.selectAll("."+d.code)
          .attr('opacity', 1);

        d3.select(this)
        .attr('fill', 'black');
        tip.transition()
					.duration(50)
					.style("opacity", 0);
        });

    svg.append("text")
      .attr("x", "-37px")
      .attr("y", "-8")
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Happiness");

  });
}

//Population Bar Chart Function
function populationBar(year){
  d3.selectAll("#population_bar").remove();

  var color = d3.scaleThreshold()
      .domain(d3.range(0, 10))
      .range(d3.schemeOranges[9]);

  // set the ranges
  var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
  var y = d3.scaleLinear()
            .range([height, 0]);

  // append the svg object to the body of the page
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select(".population_bar").append("svg")
      .attr("id", "population_bar")
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

    data.filter(function(d){return d.happiness  > 0 && d.happiness != ""})
      // format the data
      data.forEach(function(d) {
        d.population = +d.population;
      });

    data.sort(function(x, y){return d3.descending(x.population, y.population);})

    // Scale the range of the data in the domains
    x.domain(data.map(function(d, i) { if(d.population > 0){ return d.code; }}));
    y.domain([0, d3.max(data, function(d) { return d.population; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .filter(function(d) { return d.population > 0 })
        .attr("class", function(d){return "bar " + d.code})
        .attr("x", function(d) { return x(d.code); })
        .attr("width", x.bandwidth())
        .attr("y", "0px") //function(d) { return y(d.happiness); })
        .attr("height", "75") //function(d) { return height - y(d.happiness); })
        .style("fill", function(d, i) {return color(Math.log(d.population - 300000)/Math.log(18)); })

      // tooltip on mouseover
      .on("mouseover", function(d) {
        d3.selectAll("."+d.code)
          .attr('opacity', .2);

        d3.select(this)
        .attr('fill', 'blue');
        tip.transition()
            .duration(200)
            .style("opacity", .9);
            tip.text( d.code + " " +  d.country + ": " + round(d.population, 3) + " people")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY-28) + "px");})

      // fade out tooltip on mouse out
      .on("mouseout", function(d) {
        d3.selectAll("."+d.code)
          .attr('opacity', 1);

        d3.select(this)
        .attr('fill', 'black');
        tip.transition()
					.duration(50)
					.style("opacity", 0);
        });

    svg.append("text")
      .attr("x", "-37px")
      .attr("y", "-8")
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Population");

  });
}

// GDP bar chart function
function gdpBar(year){
  d3.selectAll("#gdp_bar").remove();

  var color = d3.scaleThreshold()
      .domain(d3.range(0, 10))
      .range(d3.schemeGreens[9]);

  // set the ranges
  var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
  var y = d3.scaleLinear()
            .range([height, 0]);

  // append the svg object to the body of the page
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select(".gdp_bar").append("svg")
      .attr("id", "gdp_bar")
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

    data.filter(function(d){return d.happiness  > 0})
      // format the data
      data.forEach(function(d) {
        d.gdp = +d.gdp;
      });

    data.sort(function(x, y){return d3.descending(x.gdp, y.gdp);})

    // Scale the range of the data in the domains
    x.domain(data.map(function(d, i) { if(d.gdp > 0){ return d.code; }}));
    y.domain([0, d3.max(data, function(d) { return d.gdp; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .filter(function(d) { return d.gdp > 0 })
        .attr("class", function(d){return "bar " + d.code})
        .attr("x", function(d) { return x(d.code); })
        .attr("width", x.bandwidth())
        .attr("y", "0px") //function(d) { return y(d.happiness); })
        .attr("height", "75") //function(d) { return height - y(d.happiness); })
        .style("fill", function(d, i) {return color(Math.log(d.gdp - 150000000)/Math.log(100)); })

      // tooltip on mouseover
      .on("mouseover", function(d) {
        d3.selectAll("."+d.code)
          .attr('opacity', .2);

        d3.select(this)
        .attr('fill', 'blue');
        tip.transition()
            .duration(200)
            .style("opacity", .9);
            tip.text( d.code + " " +  d.country + ": " + round(d.gdp, 0) )
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY-28) + "px");})

      // fade out tooltip on mouse out
      .on("mouseout", function(d) {
        d3.selectAll("."+d.code)
          .attr('opacity', 1);

        d3.select(this)
        .attr('fill', 'black');
        tip.transition()
					.duration(50)
					.style("opacity", 0);
        });

    svg.append("text")
      .attr("x", "-37px")
      .attr("y", "-8")
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .text("GDP");

  });
}

// Inflation bar chart function
function inflationBar(year){
  d3.selectAll("#inflation_bar").remove();

  var color = d3.scaleThreshold()
      .domain(d3.range(0, 10))
      .range(d3.schemePurples[9]);

  // set the ranges
  var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
  var y = d3.scaleLinear()
            .range([height, 0]);

  // append the svg object to the body of the page
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select(".inflation_bar").append("svg")
      .attr("id", "inflation_bar")
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

    data.filter(function(d){return d.happiness  > 0})
      // format the data
      data.forEach(function(d) {
        d.inflation = +d.inflation;
      });

    data.sort(function(x, y){return d3.descending(x.inflation, y.inflation);})

    // Scale the range of the data in the domains
    x.domain(data.map(function(d, i) { if(d.inflation > 0){ return d.code; }}));
    y.domain([0, d3.max(data, function(d) { return d.inflation; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .filter(function(d) { return d.inflation > 0 })
        .attr("class", function(d){return "bar " + d.code})
        .attr("x", function(d) { return x(d.code); })
        .attr("width", x.bandwidth())
        .attr("y", "0px") //function(d) { return y(d.happiness); })
        .attr("height", "75") //function(d) { return height - y(d.happiness); })
        .style("fill", function(d, i) {return color(Math.log(d.inflation-50)/Math.log(3)); })

      // tooltip on mouseover
      .on("mouseover", function(d) {
        d3.selectAll("."+d.code)
          .attr('opacity', .2);

        d3.select(this)
        .attr('fill', 'blue');
        tip.transition()
            .duration(200)
            .style("opacity", .9);
            tip.text( d.code + " " +  d.country + ": " + round(d.inflation, 3) )
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY-28) + "px");})

      // fade out tooltip on mouse out
      .on("mouseout", function(d) {
        d3.selectAll("."+d.code)
          .attr('opacity', 1);

        d3.select(this)
        .attr('fill', 'black');
        tip.transition()
					.duration(50)
					.style("opacity", 0);
        });

    svg.append("text")
      .attr("x", "-37px")
      .attr("y", "-8")
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Inflation");

  });
}

// unemployment bar chart function
function unemploymentBar(year){
  d3.selectAll("#unemployment_bar").remove();

  var color = d3.scaleThreshold()
      .domain(d3.range(0, 10))
      .range(d3.schemeReds[9]);

  // set the ranges
  var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
  var y = d3.scaleLinear()
            .range([height, 0]);

  // append the svg object to the body of the page
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select(".unemployment_bar").append("svg")
      .attr("id", "unemployment_bar")
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

    data.filter(function(d){return d.happiness  > 0})
      // format the data
      data.forEach(function(d) {
        d.unemployment = +d.unemployment;
      });

    data.sort(function(x, y){return d3.descending(x.unemployment, y.unemployment);})

    // Scale the range of the data in the domains
    x.domain(data.map(function(d, i) { if(d.unemployment > 0){ return d.code; }}));
    y.domain([0, d3.max(data, function(d) { return d.unemployment; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .filter(function(d) { return d.unemployment > 0 })
        .attr("class", function(d){return "bar " + d.code})
        .attr("x", function(d) { return x(d.code); })
        .attr("width", x.bandwidth())
        .attr("y", "0px") //function(d) { return y(d.happiness); })
        .attr("height", "75") //function(d) { return height - y(d.happiness); })
        .style("fill", function(d, i) {return color(d.unemployment); })

      // tooltip on mouseover
      .on("mouseover", function(d) {
        d3.selectAll("."+d.code)
          .attr('opacity', .2);

        d3.select(this)
        .attr('fill', 'blue');
        tip.transition()
            .duration(200)
            .style("opacity", .9);
            tip.text( d.code + " " +  d.country + ": " + round(d.unemployment, 3) +"%" )
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY-28) + "px");})

      // fade out tooltip on mouse out
      .on("mouseout", function(d) {
        d3.selectAll("."+d.code)
          .attr('opacity', 1);

        d3.select(this)
        .attr('fill', 'black');
        tip.transition()
					.duration(50)
					.style("opacity", 0);
        });

    svg.append("text")
      .attr("x", "-37px")
      .attr("y", "-8")
      .attr("transform", "rotate(-90)")
      .style("font-size", "12px")
      .style("text-anchor", "middle")
      .text("Unemployment");

  });
}

// alcohol bar chart function
function alcoholBar(year){
  d3.selectAll("#alcohol_bar").remove();

  var color = d3.scaleThreshold()
      .domain(d3.range(0, 10))
      .range(d3.schemeGreys[9]);

  // set the ranges
  var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
  var y = d3.scaleLinear()
            .range([height, 0]);

  // append the svg object to the body of the page
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select(".alcohol_bar").append("svg")
      .attr("id", "alcohol_bar")
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

    data.filter(function(d){return d.happiness  > 0})
      // format the data
      data.forEach(function(d) {
        d.alcohol = +d.alcohol;
      });

    data.sort(function(x, y){return d3.descending(x.alcohol, y.alcohol);})

    // Scale the range of the data in the domains
    x.domain(data.map(function(d, i) { if(d.alcohol > 0){ return d.code; }}));
    y.domain([0, d3.max(data, function(d) { return d.alcohol; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .filter(function(d) { return d.alcohol > 0 })
        .attr("class", function(d){return "bar " + d.code})
        .attr("x", function(d) { return x(d.code); })
        .attr("width", x.bandwidth())
        .attr("y", "0px") //function(d) { return y(d.happiness); })
        .attr("height", "75") //function(d) { return height - y(d.happiness); })
        .style("fill", function(d, i) {return color(d.alcohol); })

      // tooltip on mouseover
      .on("mouseover", function(d) {
        d3.selectAll("."+d.code)
          .attr('opacity', .2);

        d3.select(this)
         //.attr('fill', 'blue');
        tip.transition()
            .duration(200)
            .style("opacity", .9);
            tip.text( d.code + " " + d.country + ": " + round(d.alcohol, 3) + " Liters Per Person Per Year")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY-28) + "px");})

      // fade out tooltip on mouse out
      .on("mouseout", function(d) {
        d3.selectAll("."+d.code)
          .attr('opacity', 1);

        d3.select(this)
          //.attr('fill', 'black');
        tip.transition()
					.duration(50)
					.style("opacity", 0);
        });

    svg.append("text")
      .attr("x", "-37px")
      .attr("y", "-8")
      .attr("transform", "rotate(-90)")
      .style("font-size", "12px")
      .style("text-anchor", "middle")
      .text("Alcohol");

  });
}
