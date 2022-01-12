//Написать функцию sum, которая может быть исполнена любое количество раз с не undefined аргументом. 
//Если она исполнена без аргументов, то возвращает значение суммы всех переданных до этого значений.
//sum(1)(2)(3)....(n)() === 1 + 2 + 3 + ... + n

function sum(value) {
    if (value) {
        let count = value
        let counter = (x) => {
            if (x) {
                count += x
                return counter
            }
            return count
        }
        return counter
    }
    return null
}


console.log(sum(1)(2)(3)())
console.log(sum(1)(2)(3)(1)(2)(3)())
console.log(sum(1)())
console.log(sum())
