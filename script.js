(function(){
  window.viz = {}

  viz.skewedDistribution = function() {
    if (Math.random() > 0.2) {
      return 100 * Math.random()
    } else {
      return  30 * Math.random()
    }
  }

  viz.sample = function(dist, n) {
    var _sample = []
    for (var i = 0; i < n; i++) {
      _sample.push(dist())
    }
    return _sample
  }

  viz.viz = d3.select("#viz")
            .data(viz.sample(viz.skewedDistribution, 10))
            .enter()
            .append('p')
            .text(function(d){ return d})
            .style('font-size', function(d) { return (d/10) + 'em' })
})()
