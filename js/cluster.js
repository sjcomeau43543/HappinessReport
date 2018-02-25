function cluster(year){
	console.log("Cluster Function")
	console.log(year)
	d3.selectAll("#clusterSVG").remove();

	var width = 960,
		height = 500,
		maxRadius = 12;

	var width = 960,
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
			.iterations(1);

		var force = d3.forceSimulation()
			.nodes(countries)
			.force("center", d3.forceCenter())
			.force("collide", forceCollide)
			.force("gravity", d3.forceManyBody(30))
			.force("x", d3.forceX().strength(.7))
			.force("y", d3.forceY().strength(.7))
			.on("tick", tick);

		var svg = d3.select(".Cluster").append("svg")
			.attr("id", "clusterSVG")
			.attr("width", width)
			.attr("height", height)
			.style("border-style", "solid")
			.style("border",5)
			.append('g')
			.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		var circle = svg.selectAll("circle")
			.data(countries)
			.enter().append("circle")
			.attr("r", 15)
			.style("fill", function(d) { return color(d.happiness); });

		function tick() {
			circle
				.attr("cx", function(d) { return d.x; })
				.attr("cy", function(d) { return d.y; });
		}

	});

}
