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

  var SIDE = 640
  var identity = function(d) { return d }
  var center = 0.4

  viz.viz = d3.select("#viz")
    .append('svg').attr('width', SIDE).attr('height', SIDE)

  viz.viz.selectAll('rect')
    .data(viz.sample(viz.skewedDistribution, 10))
    .enter()
    .append('rect')
    .attr('x', function(d) { return SIDE * d })
    .attr('y', 0)
    .attr('height', function(d) { return SIDE * viz.error(2)(d, center) })
    .attr('width',  function(d) { return SIDE * viz.error(2)(d, center) })

  /*
  viz.viz.append('line')
    .attr('x1', 0).attr('y1', SIDE)
    .attr('x2', SIDE).attr('y2', SIDE)
    .attr('stroke-width', 4)
    .attr('stroke', 'grey')
  */

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
    .attr('stroke', 'grey')
    
})()
