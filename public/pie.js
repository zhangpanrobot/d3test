var dataset = [5, 10, 20, 45, 6, 25];
var pie = d3.layout.pie();

var h = window.innerHeight,
w = window.innerWidth;

var outerRadius = w / 4;
var innerRadius = w/10;
var arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);

var color = d3.scale.category10();

var svg = d3.select("body")
			.append("svg")
			.attr("width", w)
			.attr("height", h);

var arcs = svg.selectAll("g.arc")
				.data(pie(dataset))
				.enter()
				.append("g")
				.attr("class", "arc")
				.attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")");

arcs.append("path")
	.attr("fill",function(d, i) {
	    return color(i);
	})
	.attr("d", arc);

arcs.append("text")
	.attr("transform",function(d) {
	    return "translate(" + arc.centroid(d) + ")";
	})
	.attr("text-anchor", "middle")
	.attr("fill", "#fff")
	.text(function(d) {
	    return d.value;
	});