(function(){
  window.viz = {}

  viz.skewedDistribution = function() {
    if (Math.random() > 0.2) {
      return Math.random()
    } else {
      return 0.3 * Math.random()
    }
  }

  viz.sample = function(distribution, n) {
    var _sample = []
    for (var i = 0; i < n; i++) {
      _sample.push(distribution())
    }
    return _sample
  }

  viz.error = function(n) {
    // Polynomial-n error metric
    return function(a, b) {
      return Math.pow(Math.abs(b - a), n)
    }
  }

  viz.increment = function(interval) {
    return function(d, i) {
      return i * interval
    }
  }

  var SIDE = 640
  var identity = function(d) { return d }
  var sample = viz.sample(viz.skewedDistribution, 30).sort().map(function(d) {
    return Math.round(d * 10) / 10
  })
  var defaultCenter = 0.5

  viz.viz = d3.select("#viz")
    .append('svg').attr('width', SIDE).attr('height', SIDE * 2 / 3)

  viz.plot = function(center) {
    // The error distance from center
    errorSide = function(d) {
      return SIDE * Math.abs(center - d)
    }

    viz.viz.selectAll('circle.d0').remove()
    viz.viz.selectAll('line.d1').remove()
    viz.viz.selectAll('rect.d2').remove()

    // Point errors (corresponds to the mode)
    viz.viz.selectAll('circle')
      .data(sample)
      .enter()
      .append('circle')
      .attr('class', 'd0')
      .attr('cx', function(d) { return SIDE * d })
      .attr('cy', viz.increment(SIDE / 50))
      .attr('r', SIDE / 150)
      .attr('fill', 'black')
      .attr('fill-opacity', function(d) {
        return d === center ? 0 : 1
      })

    // Linear errors (corresponds to the median)
    viz.viz.selectAll('line')
      .data(sample)
      .enter()
      .append('line')
      .attr('class', 'd1')
      .attr('x1', function(d) {
        return SIDE * (d < center ? d : (center + 1/20))
      })
      .attr('x2', function(d) {
        return SIDE * (d > center ? d : (center - 1/20))
      })
      .attr('y1', viz.increment(SIDE / 50))
      .attr('y2', viz.increment(SIDE / 50))
      .attr('stroke', 'black')
      .attr('stroke-dasharray', (SIDE/80) + ', ' + (SIDE /160))
      .attr('stroke-width', SIDE / 400)
      .attr('stroke-opacity', 0.4)

    // Square errors (corresponds to the mean)
    viz.viz.selectAll('rect')
      .data(sample)
      .enter()
      .append('rect')
      .attr('class', 'd2')
      .attr('x', function(d) {
        return SIDE * (d < center ? d : center)
      })
      .attr('y', 0)
      .attr('height', errorSide)
      .attr('width',  errorSide)
      .attr('fill-opacity', 0.03)
  }

  // https://gist.github.com/enjalot/1378144
  var drag = d3.behavior.drag()
    .on("drag", function(d,i) {
      window.e = d3.event
      d = (Math.min(Math.max(0, d3.event.x - SIDE / 20), SIDE) / SIDE)
      d = Math.round(d * 10) / 10
      d3.select(this).attr("x", SIDE * d)
      viz.plot(d)
    })

  // Selected center point
  viz.viz.selectAll('rect.center')
    .data([defaultCenter])
    .enter()
    .append('rect')
    .attr('class', 'center')
    .attr('x', function(d) { return SIDE * d - (SIDE / 20)})
    .attr('y', 0)
    .attr('height', SIDE)
    .attr('width', SIDE / 10)
    .attr('fill', 'red')
    .attr('fill-opacity', 0.5)
    .call(drag)
//  .on('click', function(d){
//    viz.plot(0.2)
//  })
  viz.plot(defaultCenter)

})()
