(function(){
  var skewedDistribution = function() {
    if (Math.random() > 0.2) {
      return 100 * Math.random()
    } else {
      return  30 * Math.random()
    }
  }

  var sample = function(dist, n) {
    var _sample = []
    for (var i = 0; i < n; i++) {
      _sample.push(dist())
    }
    return _sample
  }

  var viz = d3.select("#viz")
            .append("svg")
            .attr("width", 840)
            .attr("height", 840)
})()
