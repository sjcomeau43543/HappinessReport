function cloropleth(year){
  d3.selectAll("#cloroplethMap").remove();

  var width = 960,
      height = 600,
      centered;

  var happiness = d3.map();

  var projection = d3.geoMercator()
    .scale(width / 2 / Math.PI)
    .translate([width / 2, height / 2]);

  var path = d3.geoPath()
      .projection(projection);

  var x = d3.scaleLinear()
      .domain([1, 10])
      .rangeRound([600, 860]);

  var colorPurples = d3.scaleThreshold()
      .domain(d3.range(0, 9))
      .range(d3.schemeBlues[9]);

  var svghappiness;

  svghappiness = d3.select(".Map").append("svg")
      .attr("id", "cloroplethMap")
      .attr("width", width)
      .style("border-style", "solid")
      .style("border",5)
      .attr("height", height);

  // jk its the tool tip but this name is funnier lol
  var tip = d3.select("body")
	    .append("div")
  		.attr("class", "tooltip")
  		.style("opacity", 0);

  svghappiness.append("rect")
      .attr("class", "background")
      .attr("width", width)
      .attr("height", height)
      .on("click", clicked);

  var gCountry = svghappiness.append("g");


  d3.queue()
      .defer(d3.json, "https://enjalot.github.io/wwsd/data/world/world-110m.geojson")
      .defer(d3.csv, "data/"+year+".csv", function(d) { happiness.set(d.code, d.happiness)})
      .await(ready);


  function ready(error, world) {
      if (error) throw error;

    gCountry.append("g")
        .attr("id", "countries")
      .selectAll("path")
        .data(world.features)
      .enter().append("path")
        .attr("d", path)
        .attr("fill", function(d) { return colorPurples(happiness.get(d.id));})
        .attr("stroke", "black")
        .on("click", clicked)
        .on("mouseover", function(d) {
			if(happiness.get(d.id)){
				tip.transition()
					.duration(200)
					.style("opacity", .9);
				tip.text( d.properties.name + "\n" + round(happiness.get(d.id), 3) +  " / 10")
					.style("left", (d3.event.pageX) + "px")
					.style("top", (d3.event.pageY) + "px");
			}
  	})

      // fade out tooltip on mouse out
		.on("mouseout", function(d) {
			tip.transition()
				.duration(50)
				.style("opacity", 0);
		});

      makeLables();
  }

  function clickedin(d , x, y, k) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 2;
    centered = d;
    move(d, x, y, k)

    d3.select(d.par)
  }

  function clickedout(d, x, y, k) {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
    move(d, x, y, k)
  }

  function move(d, x, y, k) {
    gCountry.selectAll("path")
        .classed("activeCount", centered && function(d) { return d === centered; });

    gCountry.transition()
        .duration(750)
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
        .style("stroke-width", 1.5 / k + "px");
  }

  function clicked(d, x, y, k) {
    var x, y, k;

    if (d && centered !== d) {
      clickedin(d, x, y, k)
    } else {
        clickedout(d, x, y, k)
    }
  }

  function makeLables(){

    var colorLabel = svghappiness.append("g")
        .attr("class", "key")
        .attr("transform", "translate(100,500)")

    colorLabel.selectAll("rect")
      .data(colorPurples.range().map(function(d) {
          d = colorPurples.invertExtent(d);
          if (d[0] == null) d[0] = x.domain()[0];
          if (d[1] == null) d[1] = x.domain()[1];
          return d;
        }))
      .enter().append("rect")
        .attr("height", 8)
        .attr("x", function(d) { return x(d[0]); })
        .attr("width", function(d) { if(x(d[1]) - x(d[0]) >= 0) {return x(d[1]) - x(d[0]);} })
        .attr("fill", function(d) { return colorPurples(d[0]); });

    colorLabel.append("text")
        .attr("class", "caption")
        .attr("x", x.range()[0])
        .attr("y", -6)
        .attr("fill", "#000")
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(year + " Average reported happiness");

    colorLabel.call(d3.axisBottom(x)
        .tickSize(13)
        .tickFormat(function(x, i) { return x; })
        .tickValues(colorPurples.domain()))
        .select(".domain")
        .remove();
  }
}

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
