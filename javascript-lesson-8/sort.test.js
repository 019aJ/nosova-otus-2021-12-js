const sort = require("./sort").sort
fs = require("fs")
test("input file should be read", () => {
  return sort("inputfiles/test.log").then((result) => expect(result).toBeDefined())
})

test("input file should be splitted on 3", () => {
  return sort("inputfiles/numbers2.log").then((result) => {
    const ex =
      fs.existsSync("inputfiles/numbers2.log1") &&
      fs.existsSync("inputfiles/numbers2.log2") &&
      fs.existsSync("inputfiles/numbers2.log3")
    expect(ex).toBeTruthy()
    fs.unlinkSync("inputfiles/numbers2.log1")
    fs.unlinkSync("inputfiles/numbers2.log2")
    fs.unlinkSync("inputfiles/numbers2.log3")
  })
})

test("tail should be right", () => {
    return sort("inputfiles/numbers3.log").then((result) => {
      let content = fs.readFileSync("inputfiles/numbers3.log1")+''
      expect(content).toBe("-8391378942540431065")
      content = fs.readFileSync("inputfiles/numbers3.log2") + ""
        expect(content).toBe("3990752617871949264")
        content = fs.readFileSync("inputfiles/numbers3.log3") + ""
        expect(content).toBe("-7677100448975903291 -2548270712408616142")
    fs.unlinkSync("inputfiles/numbers3.log1")
    fs.unlinkSync("inputfiles/numbers3.log2")
    fs.unlinkSync("inputfiles/numbers3.log3")
  })
})

test("sort in small files should be done", () => {
  return sort("inputfiles/numbers4.log").then((result) => {
    let content = fs.readFileSync("inputfiles/numbers4.log1") + ""
    expect(content).toBe("3 10")
    content = fs.readFileSync("inputfiles/numbers4.log2") + ""
    expect(content).toBe("2 4 5")
    content = fs.readFileSync("inputfiles/numbers4.log3") + ""
    expect(content).toBe("0 5 7 9")
    fs.unlinkSync("inputfiles/numbers4.log1")
    fs.unlinkSync("inputfiles/numbers4.log2")
    fs.unlinkSync("inputfiles/numbers4.log3")
  })
})

test("sort in big file should be done", () => {
  return sort("inputfiles/numbers4.log").then((result) => {
    let content = fs.readFileSync("sorted.log") + ""
    expect(content).toBe("0\n2\n3\n4\n5\n5\n7\n9\n10\n")
    fs.unlinkSync("inputfiles/numbers4.log1")
    fs.unlinkSync("inputfiles/numbers4.log2")
    fs.unlinkSync("inputfiles/numbers4.log3")
  })
})