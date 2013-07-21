set.seed(23423)

x <- seq(3, 6, 0.1)
y <- rpois(100, 4)

n.error <- function(n){
  sapply(x, function(i) { sum(abs( (y-i)^n )) })
}

center <- function(n) {
  e <- n.error(n)
  x[order(e)[1]]
}

d <- data.frame(
  n = 1:100
)
d$center = sapply(d$n, center)

plot(center ~ n, data = d, type = 'l', ylim = range(x))
text(x = 1, y = median(y), labels = 'Median (n = 1)', pos = 4)
text(x = 2, y = mean(y), labels = 'Mean (n = 2)', pos = 4)
