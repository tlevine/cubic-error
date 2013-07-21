x <- seq(0, 10, 0.1)
y <- rpois(100, 3)


n.error <- function(n){
  sapply(x, function(i) { sum(abs( (y-i)^n )) })
}


plot(n.error(6) ~ x, col = 6, type = 'l', ylim = c(0, 10))
for (m in 1:5) {
  lines(n.error(1), col = m)
}
