const splitter = " "

const processSortedChunk = (data) => {
  if (splitter === data.slice(-1)) {
    //числа ровно поместились в chunk, записываем в файл целиком
    const numList = data.trim().split(" ").map(BigInt)
    return ["", numList]
  } else {
    //последнее число обрезано, сохраняем кусок, в следующем chunk приклеим его в начало
    const splitterIndex = data.lastIndexOf(splitter)
    const tail = data.substring(splitterIndex)
    const numList = data.slice(0, splitterIndex).trim().split(" ").map(BigInt)
    return [tail, numList]
  }
}

const processChunk = (path, data, isLast, order) => {
  let tail = ""
  if (splitter === data.slice(-1) || isLast) {
    //числа ровно поместились в chunk, записываем в файл целиком
    data = sortChunk(data)
  } else {
    //последнее число обрезано, сохраняем кусок, в следующем chunk приклеим его в начало
    let splitterIndex = data.lastIndexOf(splitter)
    tail = data.substring(splitterIndex)
    data = sortChunk(data.slice(0, splitterIndex), order)
  }
  //пишем отсортированные числа в файлы
  fs.writeFileSync(path, data.trim())
  return tail
}

const sortChunk = (data, order) => {
  const numList = data.trim().split(" ").map(BigInt)
  numList.sort(function (a, b) {
    if (a > b) {
      return order === "desc" ? -1 : 1
    } else if (a < b) {
      return order === "desc" ? 1 : -1
    } else {
      return 0
    }
  })
  return numList.join(splitter)
}

module.exports.processSortedChunk = processSortedChunk
module.exports.processChunk = processChunk
