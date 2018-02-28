function cluster(year, filters){
	d3.selectAll("#clusterSVG").selectAll("*").remove();
	console.log(filters);

	var width = 700,
    	height = 500;

	var color = d3.scaleThreshold()
		.domain(d3.range(0, 9))
		.range(d3.schemeBlues[9]);

	var countries = [];

	d3.csv("data/"+year+".csv", (countries) => {


		countries.forEach(function(d) {
			if(isNaN(d.happiness) || d.happiness === "-1.0" || d.happiness === "") { d.happiness = "unavailable"; } else {d.happiness = +d.happiness;}
			if(isNaN(d.gdp) || d.gdp === "-1.0" || d.gdp === "") { d.gdp = "unavailable"; } else {d.gdp = +d.gdp}
			if(isNaN(d.population) || d.population === "-1.0" || d.population === "") { d.population = "unavailable"; } else {d.population = +d.population;}
			if(isNaN(d.inflation) || d.inflation === "-1.0" || d.inflation === "") { d.inflation = "unavailable"; } else {d.inflation = +d.inflation;}
			if(isNaN(d.unemployment) || d.unemployment === "-1.0" || d.unemployment === "") { d.unemployment = "unavailable"; } else {d.unemployment = +d.unemployment;}
			if(isNaN(d.alcohol) || d.alcohol === "-1.0" || d.alcohol === "") { d.alcohol_consumption = "unavailable"; } else {d.alcohol_consumption = +d.alcohol;}


		});


		var forceCollide = d3.forceCollide()
			.radius(function(d) { return 15 + 1.5; })
			.iterations(2);

		var force = d3.forceSimulation(countries)
			.force("center", d3.forceCenter(6))
			.force("collide", forceCollide)
			.force("gravity", d3.forceManyBody())
			.force("charge", d3.forceManyBody().strength(1).distanceMin(-1).distanceMax(-1))
			.force("x", d3.forceX().strength(.11))
			.force("y", d3.forceY().strength(.11))
			.on("tick", tick);

		var svg = d3.select("#clusterSVG")
			//.attr("style", "float:left")
			.style('display', 'inline-block')
			.attr("width", width)
			.attr("height", height)
			.style("border-style", "solid")
			.style("border",5)
			.append('g')
			.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		var tip = d3.select("body")
			.append("div")
	  		.attr("class", "tooltip")
	  		.style("opacity", 0);

		var circle = svg.selectAll("circle")
			.data(countries)
			.enter()
			.filter(function(d) {
				
				return (
					(d.happiness != "unavailable") && (d.happiness <= filters.happiness.larger) && (d.happiness >= filters.happiness.smaller) 
					&&
					((d.gdp == "unavailable") || (Math.floor(d.gdp) <= filters.gdp.larger) && (Math.floor(d.gdp) >= filters.gdp.smaller))
					&&
					((d.population == "unavailable") || (Math.floor(d.population) <= filters.population.larger) && (Math.floor(d.population) >= filters.population.smaller))
					&&
					((d.inflation == "unavailable") || (Math.floor(d.inflation) <= filters.inflation.larger) && (Math.floor(d.inflation) >= filters.inflation.smaller))
					&&
					((d.unemployment == "unavailable") || (Math.floor(d.unemployment) <= filters.unemployment.larger) && (Math.floor(d.unemployment) >= filters.unemployment.smaller))
					&&
					((d.alcohol == "unavailable") || (Math.floor(d.alcohol) <= filters.alcohol.larger) && (Math.floor(d.alcohol) >= filters.alcohol.smaller))


					) })
			.append("circle")
			.attr("r", 15)
			.style("fill", function(d) { return color(d.happiness); })
			.on("mouseover", function(d) {
				if(d.happiness != "unavailable"){
					tip.transition()
						.duration(200)
						.style("opacity", .9);

					tip.text( d.country + "\n" + round(d.happiness,3) +  " / 10")
						.style("left", (d3.event.pageX) + "px")
						.style("top", (d3.event.pageY) + "px");
				}
				})
			.on("mouseout", function(d) {
				tip.transition()
					.duration(50)
					.style("opacity", 0);
			});

		var first_tick = 0;

		function tick() {
			if (first_tick < 1){
				circle
					// .attr("cx", function(d) { return d.x = d.x*-1.1*Math.pow(8-d.happiness,2); })
					// .attr("cy", function(d) { return d.y = d.y*-1.1*Math.pow(8-d.happiness,2); });
					.attr("cx", function(d) { return d.x = (d.happiness); })
					.attr("cy", function(d) { return d.y = (d.happiness); });
					first_tick += 1;
			}
			circle
				.attr("cx", function(d) { return d.x; })
				.attr("cy", function(d) { return d.y; });

		}

	});

}

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
