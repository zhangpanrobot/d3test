var width = window.innerWidth,
    height = window.innerHeight,
    noiseScale = 0.025,
    actorStepLength = 1,
    numActors = 10000,
    step = 0,
    steps = 500;

var canvas = d3.select("body")
    .append("canvas")
    .attr({width: width, height: height});

var context = canvas.node().getContext("2d");
context.fillStyle = "rgb(0, 0, 0)";
context.fillRect(-1, -1, width, height);

var actors = [];
for(var i = 0; i < numActors; i++) {
    actors.push(actor(width, height, noiseScale, actorStepLength));
}

var opacity = easeInOut(steps);

d3.timer(function() {
    if(++step > steps) {
        console.log("done with animation");
        return true;
    }
    context.lineWidth = 0.5;
    context.globalCompositeOperation = 'lighter';
    context.beginPath();
    for(var i in actors) {
        var a = actors[i];
        var ln = a.step();
        var alpha = 0.3*opacity.get();
        context.strokeStyle = "rgba(110, 180, 49, " + alpha + ")";
        context.moveTo(ln.x1, ln.y1);
        context.lineTo(ln.x2, ln.y2);
    }
    context.stroke();
    opacity.step();
});

function actor(width, height, noiseScale, stepLength) {

    var x = Math.random() * width,
        y = Math.random() * height,
        z = Math.random() * 15;

    var noise = perlin.noise(noiseScale);

    return {
        // get the last point and the next point
        step: function() {
            var t = 24 * noise(x, y, z)
            t = (t - Math.floor(t)) * 2 * Math.PI;
            var x1 = x,
                y1 = y;
            x = x + stepLength * Math.cos(t);
            y = y + stepLength * Math.sin(t);
            return {
                x1: x1,
                y1: y1,
                x2: x,
                y2: y
            }
        }
    }
}

function easeInOut(steps) {
    var n = 0;
    var val = 0;
    return {
        step:
            function() {
                val = 0.5*(1-Math.cos(2 * Math.PI * (n++) / steps));
            },
        get:
            function() {
                return val;
            }
    };
}