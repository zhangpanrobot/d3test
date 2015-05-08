var dataset = [5, 10, 20, 45, 6, 25];
var pie = d3.layout.pie();

var h = 300,
w = 300;

var outerRadius = w / 2;
var innerRadius = w/5;
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