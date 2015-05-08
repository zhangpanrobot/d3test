var colorOne = d3.scale.quantize()
                        .range(["rgb(237,248,233)", "rgb(186,228,179)","rgb(116,196,118)", "rgb(49,163,84)","rgb(0,109,44)"])
    //创建svg
    var width = window.innerWidth, height = window.innerHeight;
    var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);
    //创建投影(projection)
    var projection = d3.geo.mercator().translate([width / 2, height / 2]).center([105, 38]).scale(1000);
    //创建path
    var path = d3.geo.path().projection(projection);

    //解析json
    d3.json("./public/china.geo.json", function(json) {
        //TODO: 标出省会点
        colorOne.domain([
            d3.min(json.features, function(d) { return d.properties.childNum; }), 
            d3.max(json.features, function(d) { return d.properties.childNum; })
        ]);
        svg.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path)
                .on('mouseover', function(data) {
                    var selfEle = d3.select(this);
                    selfEle.attr('opacity', '0.5');
                    selfEle.attr('id', function(d){
                        return d.id;
                    })
                    //创建显示tooltip用的矩形
                    svg.append("rect")
                            .attr({
                                "id": "tooltip1",
                                "x": 50,
                                "y":50,
                                "width":140,
                                "height":130,
                                "stroke":"black",
                                "fill":"none"
                            })
                    ;
                    //创建显示tooltip文本
                    svg.append("text")
                            .attr({
                                "id": "tooltip2",
                                "x": 80,
                                "y": 100,
                                "text-anchor": "left",
                                "font-family": "sans-serif",
                                "font-size": "11px",
                                "font-weight": "bold",
                                "fill": "black"
                            })
                            .text(data.properties.name);

                    svg.append("text")
                            .attr({
                                "id": "tooltip3",
                                "x": 80,
                                "y": 150,
                                "text-anchor": "left",
                                "font-family": "sans-serif",
                                "font-size": "11px",
                                "font-weight": "bold",
                                "fill": "black"
                            })
                            .text("下属市:" + data.properties.childNum + "个");
                    // d3.json("./public/mapData.json", function(data){
                    //     d3.json('/getdata?url=' + data[selfEle.attr('id')].url, function(province_data){
                    //     			//console.log(selfEle.selectAll);
                    //     			var a = svg.selectAll("path")
								            // .data(province_data.features)
								            // .enter()
								            // .append("path")
								            // .attr("d", path)
								            // .attr({
							             //        'fill': function(d){
							             //            return colorOne(d.properties.childNum)
							             //        },
							             //        'stroke': 'rgba(255,255,255, 05)',
							             //        'stroke-width': 1
							             //    });
                    //     			console.log(a);
                    //     });
                    // });
                })
                .on('mouseout', function(data) {
                    d3.select(this).attr('opacity', '1');
                    //Remove the tooltip
                    d3.select("#tooltip1").remove();
                    d3.select("#tooltip2").remove();
                    d3.select("#tooltip3").remove();
                    var secondSvg = document.getElementsByTagName("svg")[1];
                    secondSvg && secondSvg.parentNode.removeChild(secondSvg);
                })
                .attr({
                    'fill': function(d){
                        return colorOne(d.properties.childNum)
                    },
                    'stroke': 'rgb(255,255,255)',
                    'stroke-width': 1
                });
        svg.selectAll('circle')
           .data(json.features)
           .enter()
           .append('circle')
           .attr({
	           	 'cx': function(d){ projection(d.properties.cp)[0]}
	       		,'cy': function(d){projection(d.properties.cp)[1]}
	            ,'r': 5
	            ,'fill': 'yellow'
            })
           .style('opacity', '0.75');
    svg.selectAll('text')
           .data(json.features)
           .enter()
           .append('text')
           .text(function(d){
            return d.properties.name;
           })
           .attr({
	           	'x': function(d){return projection(d.properties.cp)[0]}
	           ,'y': function(d){return projection(d.properties.cp)[1]}
	           ,'font-size': '11'
	           ,'fill': 'yellow'
       		})
           .style('opacity', '0.75');
    });






















