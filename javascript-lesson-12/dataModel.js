const users = [
  {
    id: 1,
    username: "Brian",
    password: "1",
    email: "Brian@google.com",
    role: "USER",
  },
  {
    id: 2,
    username: "Kim",
    password: "22",
    email: "Kim@google.com",
    role: "USER",
  },
  {
    id: 3,
    name: "Faith",
    password: "23",
    email: "Hammerhead@google.com",
    role: "USER",
  },
  {
    id: 4,
    name: "Joseph",
    password: "23",
    email: "Tiger@google.com",
    role: "USER",
  },
  {
    id: 5,
    name: "Joy",
    password: "25",
    email: "Hammerhead@google.com",
    role: "ADMIN",
  },
]

const allItems = [
  {
    id: 1,
    name: "Longan",
    description: "longan",
    price: 310,
    discount: 10,
    features: [
      {
        name: "Weight",
        valueNum: 250,
      },
      {
        name: "Expiration date",
        valueNum: 20,
      },
    ],
  },
  {
    id: 2,
    name: "Pineapple",
    description: "Pineapple",
    price: 285,
    features: [
      {
        name: "Weight",
        valueNum: 1000,
      },
      {
        name: "Expiration date",
        valueNum: 20,
      },
      {
        name: "Distributor",
        valueString: "Marka",
      },
    ],
  },
  {
    id: 3,
    name: "Granadilla",
    description: "Granadilla",
    price: 295,
    discount: 10,
    features: [
      {
        name: "Amount",
        valueNum: 2,
      },
      {
        name: "Expiration date",
        valueNum: 20,
      },
      {
        name: "Distributor",
        valueString: "grinfields",
      },
    ],
  },
  {
    id: 4,
    name: "Lychee",
    description: "Lychee",
    price: 296,
    features: [
      {
        name: "Weight",
        valueNum: 520,
      },
      {
        name: "Expiration date",
        valueNum: 90,
      },
      {
        name: "Distributor",
        valueString: "surexport",
      },
    ],
  },
  {
    id: 5,
    name: "Mangosteen",
    description: "Mangosteen",
    price: 310,
    discount: 10,
    features: [
      {
        name: "Amount",
        valueNum: 2,
      },
      {
        name: "Expiration date",
        valueNum: 14,
      },
      {
        name: "Distributor",
        valueString: "grinfields",
      },
    ],
  },
]

module.exports.users = users
module.exports.allItems = allItems