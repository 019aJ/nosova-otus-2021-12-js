//алгоритм слияния массивов
//т.к. файлы для сортировки передаются не целиком, то полностью выполнить слияние нельзя. 
//Делаем до тех пор, пока один из пришедших списков не кончится
const mergeArrays = (arraysToMerge, order) => {
  const result = []
  const totalSize = arraysToMerge
    .map((ar) => ar.length)
    .reduce((partialSum, a) => partialSum + a, 0)
  /*Некоторые файлы уже могли прочитаться до конца, их игнорируем при проверке остановки*/
  const deadIndexes = []
  for (let index = 0; index < arraysToMerge.length; index++) {
    if (arraysToMerge[index].length === 0) {
      deadIndexes.push(index)
    }
  }
  //делаем слияние до тех пор, пока один из массивов не кончится
  let hasElements = true
  while (result.length < totalSize && hasElements) {
    const currentValues = arraysToMerge
      .filter((cur) => cur.length > 0)
      .map((cur) => cur[0])
    hasElements =
      currentValues.length === arraysToMerge.length - deadIndexes.length
    if (hasElements) {
      const val =
        order === "asc"
          ? bigint_min(...currentValues)
          : bigint_max(...currentValues)
      arraysToMerge.find((cur) => cur.length > 0 && cur[0] === val).shift()
      result.push(val)
    }
  }
  return result
}

const bigint_min = (...args) => {
  if (args.length < 1) {
    throw "Min of empty list"
  }
  m = args[0]
  args.forEach((a) => {
    if (a < m) {
      m = a
    }
  })
  return m
}

const bigint_max = (...args) => {
  if (args.length < 1) {
    throw "Max of empty list"
  }
  m = args[0]
  args.forEach((a) => {
    if (a > m) {
      m = a
    }
  })
  return m
}

module.exports = mergeArrays
