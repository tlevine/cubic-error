x <- seq(0, 10, 0.1)
y <- rpois(100, 3)


n.error <- function(n){
  sapply(x, function(i) { sum(abs( (y-i)^n )) })
}

center <- function(n) {
  e <- n.error(n)
  x[order(e)[1]]
}

d <- data.frame(
  n = 1:100,
  center = sapply(1:100, center)
)
plot(center ~ n, data = d, type = 'l')
