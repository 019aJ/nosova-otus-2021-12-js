const { resolve } = require("path")
const mergeArrays = require("./mergeArrays")
const processSortedChunk = require("./chunkOperations").processSortedChunk
const processChunk = require("./chunkOperations").processChunk
fs = require("fs")
const splitter = " "
const filesCount = 3

const sort = async (path, order = "asc") => {
  const resultFile = "sorted.log"
  const stats = fs.statSync(path)
  const chunkSizeInBytes = Math.ceil(stats.size / filesCount)
  if (chunkSizeInBytes > 0) {
    const readStream = fs.createReadStream(path || "numbers.log", {
      highWaterMark: chunkSizeInBytes,
      encoding: "utf8",
    })

    await new Promise((resolve, reject) => {
      let tail = ""
      let cnt = 0
      //делим на filesCount файла
      readStream
        .on("data", function (chunk) {
          cnt++
          tail = processChunk(
            path + cnt,
            tail + chunk,
            cnt === filesCount,
            order
          )
        })
        .on("end", function () {
          //объединяем отсортированные файлы в один
          mergeSortedFiles(path, order, resultFile, resolve)
        })
    })
  }
  return resultFile
}

const mergeSortedFiles = async (path, order, resultFile, resolve) => {
  const threads = []
  const arraysToMerge = []
  //создали пустой выходной файл
  fs.closeSync(fs.openSync(resultFile, "w"))
  for (let index = 1; index <= filesCount; index++) {
    //для каждого файла создаем поток
    const readStream = fs.createReadStream(path + index, {
      encoding: "utf8",
    })
    threads.push(readStream)
    let tail = ""
    readStream
      .on("data", function (chunk) {
        //прочли порцию, ставим на паузу
        if (chunk !== null) {
          readStream.pause()
          //строку в массив bigInt
          let [t, numList] = processSortedChunk(tail + chunk)
          tail = t
          addArrayToMergeList(arraysToMerge, index, numList)
          //выполняем слияние
          mergeChunks(arraysToMerge, order, resultFile, threads)
        }
      })
      .on("end", function () {
        threads[index - 1] = null
        if (tail) {
          let [t, numList] = processSortedChunk(tail.trim() + splitter)
          addArrayToMergeList(arraysToMerge, index, numList)
          mergeChunks(arraysToMerge, order, resultFile, threads)
        }
        if (threads.filter((t) => t != null).length === 0) {
          resolve()
        }
      })
  }
}

const mergeChunks = (arraysToMerge, order, resultFile, threads) => {
  if (arraysToMerge.length >= filesCount) {
    const result = mergeArrays(arraysToMerge, order)
    //записали отсортированный кусок в файл
    fs.appendFileSync(resultFile, result.join("\n") + "\n")
    //запускаем потоки, чтоб они прочитали еще по одной порции
    let awaken = false
    let hasAlive =
      arraysToMerge.map((a) => a.length).filter((a) => a > 0).length > 0

    for (let index = 0; index < arraysToMerge.length; index++) {
      if (arraysToMerge[index].length == 0 && threads[index] !== null) {
        threads[index].resume()
        awaken = true
      }
      if (threads[index] !== null) {
        hasAlive = true
      }
    }
    //не нашли кого разбудить, обрабатываем то что осталось еще раз
    if (!awaken && hasAlive) {
      mergeChunks(arraysToMerge, order, resultFile, threads)
    }
  }
}

const addArrayToMergeList = (arraysToMerge, index, numList) => {
  if (arraysToMerge.length >= filesCount) {
    arraysToMerge[index - 1].push(...numList)
  } else {
    arraysToMerge.push(numList)
  }
}

module.exports.sort = sort
