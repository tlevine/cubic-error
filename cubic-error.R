x <- seq(0, 10, 0.1)
y <- rpois(100, 3)

abs.error <- sapply(x, function(i){    sum(abs( (y - i)^1) )})
squared.error <- sapply(x, function(i){sum(abs( (y - i)^2) )})
cubed.error <- sapply(x, function(i){  sum(abs( (y - i)^3) )})

plot(cubed.error ~ x, type = 'l')
lines(squared.error ~ x, col = 2)
lines(abs.error ~ x, col = 3)

print(x[order(abs.error)[1]])
print(x[order(squared.error)[1]])
print(x[order(cubed.error)[1]])
