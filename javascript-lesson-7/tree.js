// Напишите NodeJS скрипт tree для вывода списка файлов и папок файловой системы.
// Результатом работы должен быть объект с массивами { files, folders }.
// Вызовы файловой системы должны быть асинхронными.
// Скрипт принимает входной параметр - путь до папки.
// Добавить возможность выполнять этот скрипт через команду npm run tree -- path
const fs = require("fs")
const fsPromises = fs.promises
const pathSeparator = "/"

const pathPrintCommand = (folderName)=>{ 
    path(folderName).then(r => console.log(r))
}

const path = async (folderName) => {
  if (fs.existsSync(folderName)) {
    return fsPromises
      .access(folderName, fs.constants.R_OK)
      .then(() => fsPromises.readdir(folderName))
      .then((filenames) => collectChildren(folderName, filenames))
      .catch(() => {
        throw "cannot access"
      })
  } else {
    throw "path doesn't exists"
  }
}

const emptyContent = () => {
  return {
    files: [],
    dirs: [],
  }
}

const collectChildren = async (folderName, filenames) => {
  const result = emptyContent()
  if (filenames) {
    const foldernames = []
    filenames
      .map((filename) => folderName + pathSeparator + filename)
      .forEach((filePath) => {
        if (fs.lstatSync(filePath).isFile()) {
          result.files.push(filePath)
        } else {
          foldernames.push(filePath)
        }
      })
    if (foldernames.length > 0) {
      result.dirs.push(...foldernames)
      return childPath(foldernames).then((childContent) => {
        if (childContent)
          for (let folderRes of childContent.reverse()) {
            result.files.unshift(...folderRes.files)
            result.dirs.unshift(...folderRes.dirs)
          }
        return Promise.resolve(result)
      })
    }
  }
  return Promise.resolve(result)
}
const childPath = (foldernames) => {
  const promises = foldernames.map((folder) => path(folder))
  return Promise.all(promises)
}

module.exports.path = path
module.exports.pathCommand = pathPrintCommand