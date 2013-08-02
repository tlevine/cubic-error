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

  var SIDE = 840
  var identity = function(d) { return d}

  viz.viz = d3.select("#viz")
            .append('svg').attr('width', SIDE).attr('height', SIDE)
            .selectAll('rect')
            .data(viz.sample(viz.skewedDistribution, 10))
            .enter()
            .append('rect')
            .attr('x', function(d) { return SIDE * d })
            .attr('y', 0)
            .attr('height', 10)
            .attr('width', 10)
// <rect x="0" y="0" width="500" height="50"/>
})()
