// Написать функцию
// promiseReduce(asyncFunctions, reduce, initialValue)
// asyncFunctions - массив асинхронных функций, возвращающих промис
// reduce(memo, value) - функция, которая будет вызвана для каждого успешно завершившегося промиса.
//     initialValue - стартовое значение для функции reduce
// promiseReduce последовательно вызывает переданные асинхронные функции
// и выполняет reduce функцию сразу при получении результата до вызова следующей асинхронной функции.Функция promiseReduce должна возвращать промис с конечным результатом.

function promiseReduce(asyncFunctions, reduce, initialValue) {
   return asyncFunctions.reduce((prevPromise, currentPromiseFunc) => { 
       return prevPromise.then(prevRes => currentPromiseFunc().then(currentRes => reduce(prevRes, currentRes)))
   }, Promise.resolve(initialValue))
}

var fn1 = () => {
    console.log('fn1')
    return Promise.resolve(1)
}

var fn2 = () => new Promise(resolve => {
    console.log('fn2')
    setTimeout(() => resolve(2), 1000)
})

var fn3 = () => new Promise(resolve => {
    console.log('fn3')
    setTimeout(() => resolve(3), 500)
})


promiseReduce(
    [fn1, fn2, fn3],
    function (memo, value) {
        console.log('reduce')
        return memo * value
    },
    1
).then(console.log) 