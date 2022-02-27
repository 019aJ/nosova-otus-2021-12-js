# Примеры query
# Выбор пользователя
{
  user(login: "Brian"
  password:"1") {
    id
    username
  } 
} 
# Выбор товаров без фильров
{  items(filter: null, details: null, startIndex: 0, itemCount: 5){
    id
    name
  }
}
# Выбор товаров с фильтром по имени
{ items(filter: {searchText:"Mangosteen"}, details: null, startIndex: 0, itemCount: 5){
    id
    name
  }
}
# Выбор товаров с фильтром по имени с низкой детализацией
{ items(filter: {searchText:"Mangosteen"}, details: LOW, startIndex: 0, itemCount: 5){
    id
    name
    price
    description
  }
}

# Выбор товаров с фильтром по имени и по свойству
{ items(filter: {searchText:"Mangosteen", features: [{name: "Expiration date" , valueNum: 14}]}, details: null, startIndex: 0, itemCount: 5){
    id
    name
  }
} 
# Выбор категорий, если установлен фильтр по имени 
{ categories(filter: {searchText:"Mangosteen"}, details: null){
    name
    valueType
    features{valueNum}
  }
}

# Выбор категорий с низкой детализацией
{ categories(filter: null, details: LOW){
    name
    valueType
    features{valueNum}
  }
}  

# Примеры mutation
# Создание пользователя
mutation CreateUserMutation($user: InputUser!){
    createUser(user: $user){
    id
    username
    email
    role}
  }

# переменные для создания пользователя
{
  "user": {
  "username": "Olga",
  "password": "123",
  "email": "019a@mail.ru",
  "role": "ADMIN"
}
}

# Создание заказа
mutation CreateOrderMutation($order: InputOrder!) {
  createOrder(order: $order) {
    id
    totalPrice
  }
}

# переменные для создания заказа
{
  "order": {
    "user": {
      "username": "Olga",
      "password": "123",
      "email": "019a@mail.ru",
      "role": "ADMIN"
    },
    "items": [
      {
        "item": {
          "id": 5
        },
        "amount": 1
      },
      {"item": {
          "id": 4
        },
        "amount": 2}
    ],
    "cupon": null
  }
}

