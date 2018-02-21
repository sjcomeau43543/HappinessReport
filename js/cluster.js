function cluster(year){
  console.log("Cluster Function")
  console.log(year)

  var width = 960,
      height = 500,
      maxRadius = 12;

var n = 196, // total number of circles
    m = 1; // number of distinct clusters

var color = d3.scaleOrdinal(d3.schemeCategory10).domain(d3.range(m));

// The largest node for each cluster.
var clusters = new Array(m);

var nodes = d3.range(n).map(function() {
  var i = Math.floor(Math.random() * m),
      r = Math.sqrt((i + 1) / m * -Math.log(Math.random())) * maxRadius,
      d = {cluster: i, radius: r};
  if (!clusters[i] || (r > clusters[i].radius)) clusters[i] = d;
  return d;
});

var forceCollide = d3.forceCollide()
    .radius(function(d) { return d.radius + 1.5; })
    .iterations(1);

var force = d3.forceSimulation()
    .nodes(nodes)
    .force("center", d3.forceCenter())
    .force("collide", forceCollide)
    .force("cluster", forceCluster)
    .force("gravity", d3.forceManyBody(30))
    .force("x", d3.forceX().strength(.7))
    .force("y", d3.forceY().strength(.7))
    .on("tick", tick);

var svg = d3.select(".Cluster").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("border-style", "solid")
    .style("border",5)
  .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

var circle = svg.selectAll("circle")
    .data(nodes)
  .enter().append("circle")
    .attr("r", function(d) { return d.radius; })
    .style("fill", function(d) { return color(d.cluster); })

function tick() {
  circle
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
}

  function forceCluster(alpha) {
    for (var i = 0, n = nodes.length, node, cluster, k = alpha * 1; i < n; ++i) {
      node = nodes[i];
      cluster = clusters[node.cluster];
      node.vx -= (node.x - cluster.x) * k;
      node.vy -= (node.y - cluster.y) * k;
    }
  }
}