const express = require("express")
const { graphqlHTTP } = require("express-graphql")

const users = require("./dataModel").users
const allItems = require("./dataModel").allItems
const schema = require("./schemaGQL")
const filterItems = require("./filterHelper")

const findUser = (args) => {
  filtered = users.filter(
    (user) => user.username == args.login && user.password == args.password
  )
  return filtered.length > 0 ? filtered[0] : {}
}

const findItems = (args) => {
  let resList = filterItems(args)
  if (args.startIndex && args.startIndex > 0) {
    resList = resList.slice(args.startIndex)
  }
  if (args.itemCount && args.itemCount < resList.length) {
    resList = resList.slice(0, args.itemCount)
  }
  if (args.details === "LOW") {
    return resList.map((item) => {
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        discount: item.discount,
      }
    })
  }
  return resList
}

const getCategories = (args) => {
  const allFeatures = filterItems(args).flatMap((item) => item.features)
  let categoryNames = allFeatures.map((f) => f.name)
  categoryNames = [...new Set(categoryNames)]
  let cat = categoryNames.map((name) => {
    const cat = {
      name: name,
    }
    cat.features = allFeatures.filter((f) => f.name === name)
    cat.valueType = cat.features[0].valueNum
      ? "INTERVAL"
      : cat.features[0].valueDate
      ? "DATEINTERVAL"
      : "LIST"
    return cat
  })
  if (args.details === "LOW") {
    cat = cat.slice(0, 3)
  }
  return cat
}

const createUser = (args) => {
    args.user.id = users.length + 1
    users.push(args.user)
    return args.user
  }

const createOrder = (args) => {
    const order = args.order
    order.id = 1
    order.totalPrice = order.items
      .map((itemAmount) => {
        const item = allItems.filter((i) => i.id === itemAmount.item.id)[0]
        const amount = itemAmount.amount
        return item.discount
          ? (item.price * amount * (100 - item.discount)) / 100
          : item.price * amount
      })
      .reduce((partialSum, a) => partialSum + a, 0)
    if (order.cupon) {
      order.totalPrice *= 0.9
    }
    return order
  }

// Root resolver
const root = {
  user: findUser,
  items: findItems,
  categories: getCategories,
  createUser: createUser,
  createOrder: createOrder,
}

// Create an express server and a GraphQL endpoint
const app = express()
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema, 
    rootValue: root,
    graphiql: true, 
  })
)
app.listen(4000, () => console.log("Now browse to localhost:4000/graphql"))
