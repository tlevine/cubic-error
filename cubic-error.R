x <- 1:10

abs.error <- sapply(x, function(i){sum(abs(iris$Sepal.Length - i))})
squared.error <- sapply(x, function(i){sum((iris$Sepal.Length - i))})
cubed.error <- sapply(x, function(i){sum((iris$Sepal.Length - i))})

plot(cubed.error ~ x, type = 'l')
lines(squared.error ~ x, col = 2)
lines(abs.error ~ x, col = 3)

print(x[order(abs(abs.error))[1]])
print(x[order(abs(squared.error))[1]])
print(x[order(abs(cubed.error))[1]])
