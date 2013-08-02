(function(){
  window.viz = {}

  viz.skewedDistribution = function() {
    if (Math.random() > 0.2) {
      return Math.random()
    } else {
      return 0.3 * Math.random()
    }
  }

  viz.sample = function(dist, n) {
    var _sample = []
    for (var i = 0; i < n; i++) {
      _sample.push(dist())
    }
    return _sample
  }

  var identity = function(d) { return d}

  var SIDE = 840

  viz.viz = d3.select("#viz")
            .append('svg').attr('width', SIDE).attr('height', SIDE)
            .data(viz.sample(viz.skewedDistribution, 10))
            .enter()
            .append('rect')
            .attr('x', identity)
            .attr('y', 0)
            .attr('height', function(d) { return SIDE * d })
            .attr('width', function(d) { return SIDE * d })
            .attr('fill', 'black')
// <rect x="0" y="0" width="500" height="50"/>
})()
