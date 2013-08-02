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

  viz.ticks = function(n) {
    var vec = []
    for (var i = 0; i < n; i++) {
      vec.push(i / n)
    }
    return vec
  }

  viz.error = function(n) {
    // Polynomial-n error metric
    return function(a, b) {
      return Math.pow(Math.abs(b - a), n)
    }
  }

  viz.errorSide = function(d) {
    return SIDE * Math.abs(center - d)
  }

  viz.increment = function(interval) {
    return function(d, i) {
      return i * interval
    }
  }

  var SIDE = 640
  var identity = function(d) { return d }
  var center = 0.3
  var sample = viz.sample(viz.skewedDistribution, 30).sort().map(function(d) {
    return Math.round(d * 10) / 10
  })
  viz.viz = d3.select("#viz")
    .append('svg').attr('width', SIDE).attr('height', SIDE)

  // Point errors (corresponds to the mode)
  viz.viz.selectAll('circle')
    .data(sample)
    .enter()
    .append('circle')
    .attr('cx', function(d) { return SIDE * d })
    .attr('cy', viz.increment(SIDE / 50))
    .attr('r', SIDE / 100)
    .attr('fill', 'black')
    .attr('fill-opacity', function(d) {
      return d === center ? 0 : 1
    })

  // Linear errors (corresponds to the median)
  viz.viz.selectAll('line')
    .data(sample)
    .enter()
    .append('line')
    .attr('x1', function(d) {
      return SIDE * (d < center ? d : center)
    })
    .attr('x2', function(d) {
      return SIDE * (d > center ? d : center)
    })
    .attr('y1', viz.increment(SIDE / 50))
    .attr('y2', viz.increment(SIDE / 50))
    .attr('stroke', 'red')
    .attr('stroke-width', SIDE / 100)
    .attr('stroke-opacity', 0.2)

  // Square errors (corresponds to the mean)
  viz.viz.selectAll('rect')
    .data(sample)
    .enter()
    .append('rect')
    .attr('x', function(d) {
      return SIDE * (d < center ? d : center)
    })
    .attr('y', 0)
    .attr('height', viz.errorSide)
    .attr('width',  viz.errorSide)
    .attr('fill-opacity', 0.03)

  /*
  viz.viz.append('line')
    .attr('x1', 0).attr('y1', SIDE)
    .attr('x2', SIDE).attr('y2', SIDE)
    .attr('stroke-width', 4)
    .attr('stroke', 'grey')
  */

  // Ticks
  viz.viz
    .selectAll('line')
    .data(viz.ticks(10))
    .enter()
    .append('line')
    .attr('x1', function(d) { return SIDE * d })
    .attr('x2', function(d) { return SIDE * d })
    .attr('y1', SIDE * 0.95)
    .attr('y2', SIDE)
    .attr('stroke-width', 4)
    .attr('stroke', 'black')
    
})()
