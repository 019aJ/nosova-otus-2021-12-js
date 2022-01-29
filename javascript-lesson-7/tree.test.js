const path = require("./tree").path;

test("if path is available should return array", () => {
  //const result = path('C:/OtusJS/nosova-otus-2021-12-js/javascript-lesson-7/node_modules')
  return path("node_modules/fs").then((result) => expect(result).toBeDefined())
});

test("if path has read permission should return array", () => {
  return path("node_modules/fs").then((result) => expect(result).toBeDefined())
});

test("if path has only files should return them", () => {
  return path("node_modules/fs").then((result) =>
    expect(result).toMatchObject({
      files: ["node_modules/fs/package.json", "node_modules/fs/README.md"],
      dirs: [],
    })
  );
});

test("if path has files and directories should return them", () => {
  return path("node_modules/jest").then((result) =>
    expect(result).toMatchObject({
      files: [
        "node_modules/jest/bin/jest.js",
        "node_modules/jest/build/jest.d.ts",
        "node_modules/jest/build/jest.js",
        "node_modules/jest/LICENSE",
        "node_modules/jest/package.json",
        "node_modules/jest/README.md",
      ],
      dirs: [
        "node_modules/jest/bin",
        "node_modules/jest/build"
      ],
    })
  )
})

test("if path is not available should throw error", () => {
  return path("/node").catch((e) => expect(e).toMatch("path doesn't exists"));
});