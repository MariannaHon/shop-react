# The Shop

This project serves as BE and DB for the "The Shop" capstone project.
It uses an in-memory MongoDB database for now. 

Don't judge the code :) It's forked from [Fake Store API](https://github.com/Oserhir/Fake-Store-API-nodejs).


## Table of contents

- [The Shop](#the-shop)
  - [Table of contents](#table-of-contents)
  - [Features](#features)
  - [How to run it locally?](#how-to-run-it-locally)
  - [API Authentication](#api-authentication)
  - [Authentication](#authentication)
    - [Sign in](#sign-in)
    - [Sign up](#sign-up)
  - [User Actions](#user-actions)
    - [Get logged user](#get-logged-user)
    - [Update account](#update-account)
    - [Delete account](#delete-account)
    - [Change password](#change-password)
  - [Category](#category)
    - [Get a single category](#get-a-single-category)
    - [Get all categories](#get-all-categories)
    - [Get all products by category](#get-all-products-by-category)
    - [Category schema](#category-schema)
  - [Subcategories](#subcategories)
    - [Get all subcategories](#get-all-subcategories)
    - [Get a single subcategory](#get-a-single-subcategory)
    - [Get all subcategories for a category](#get-all-subcategories-for-a-category)
    - [Subcategory schema](#subcategory-schema)
  - [Brands](#brands)
    - [Get all brands](#get-all-brands)
    - [Get brand by id](#get-brand-by-id)
    - [Brand schema](#brand-schema)
  - [Products](#products)
    - [Get a product by id](#get-a-product-by-id)
    - [Get all products](#get-all-products)
    - [Get related products](#get-related-products)
    - [Search for a product by price](#search-for-a-product-by-price)
    - [Search by title or description](#search-by-title-or-description)
    - [Filter results](#filter-results)
    - [Field limiting](#field-limiting)
    - [Product schema](#product-schema)
  - [Addresses](#addresses)
    - [Add user address](#add-user-address)
    - [Remove user address](#remove-user-address)
    - [Get user addresses](#get-user-addresses)
  - [Cart](#cart)
    - [Add product to cart](#add-product-to-cart)
    - [Get cart](#get-cart)
    - [Update item in cart](#update-item-in-cart)
    - [Remove item from cart](#remove-item-from-cart)
    - [Clear cart](#clear-cart)
    - [Cart Schema](#cart-schema)


## Features

- ✅ Authentication using JSON Web tokens (JWT).
- ✅ Advance searching, sorting, pagination and filtering.
- ✅ Schema validation using Express-Validator.
- ✅ All CRUD Operations.
- ✅ Add to cart.


## How to run it locally?

Go to the project directory

```bash
  cd be
```

Install dependencies

```bash
  npm install
```

Create `.env` file in the `be/` directory with a fake `JWT` token, like this:

```env
  JWT_SECRET="test"
```

Start the server

```bash
  npm run start
```

Server should start by generating fake data.

It's highly recommended to install [Postman](https://www.postman.com/downloads/) on your machine and import `postman-collection.json`. Import `postman-collection.json` by following this [tutorial](https://docs.tink.com/entries/articles/postman-collection-for-account-check).

## API Authentication

Some endpoints may require authentication (e.g. cart). You need to register your API users and obtain an access token.

The endpoints that require authentication expect a bearer token sent in the `Authorization header`.

**Example**:

`Authorization: Bearer YOUR TOKEN`

---


## Authentication

Auth Routes:

| Route            | Type | Access | Description |
| ---------------- | ---- | ------ | ----------- |
| /api/auth/signup | POST | Public | Sign up     |
| /api/auth/login  | POST | Public | Sign in     |

### Sign in

You can do login by sending an object like the following to `/auth/login/`

```bash
[POST] http://localhost:3000/api/auth/login
```

```json
{
  "email": "ruby@mail.com",
  "password": "123456"
}
```

<details>
<summary>Response</summary>

```json
{
  "data": {
    "_id": "63bc7cf53e721990a8cc4ff8",
    "name": "Ruby",
    "lastName": "Doe",
    "email": "ruby@mail.com",
    "role": "user",
    "active": true,
    "wishlist": [],
    "addresses": [],
    "createdAt": "2023-01-09T20:45:41.648Z",
    "updatedAt": "2023-01-09T20:45:41.648Z",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2JjN2NmNTNlNzIxOTkwYThjYzRmZjgiLCJpYXQiOjE2NzMyOTczOTYsImV4cCI6MTY4MTA3MzM5Nn0.cHnKhOCIYvWkEvS2yNYKYDrTvvUOV5GaxddTzbqYSLA"
}
```

</details>

### Sign up

Create a user by sending user's credentials (in JSON format) in the `body` of the HTTP Request. The content of the `body` should look like the following:

```bash
[POST] http://localhost:3000/api/auth/signup
```

```json
{
  "name": "Ruby",
  "email": "ruby@mail.com",
  "password": "123456",
  "passwordConfirm": "123456"
}
```

<details>
<summary>Response</summary>

```json
{
  "data": {
    "name": "Ruby",
    "lastName": "Doe",
    "email": "ruby@mail.com",
    "password": "$2a$12$vJ1Yf9Jkj700doCaSZBlgudPTOLlzpkGgOlB4fUzOwaKcYyQGfGJS",
    "role": "user",
    "active": true,
    "wishlist": [],
    "_id": "63bc7cf53e721990a8cc4ff8",
    "addresses": [],
    "createdAt": "2023-01-09T20:45:41.648Z",
    "updatedAt": "2023-01-09T20:45:41.648Z",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2JjN2NmNTNlNzIxOTkwYThjYzRmZjgiLCJpYXQiOjE2NzMyOTcxNDQsImV4cCI6MTY4MTA3MzE0NH0.FpBunPGtHG88Xi2fvJ4k-q7t3vW_ARPBpmAH-eMAmzQ"
}
```

</details>

---

## User Actions

| Route                              | Type   | Access  | Description     |
| ---------------------------------- | ------ | ------- | --------------- |
| `/api/users/getMe `                | GET    | Private | Get logged user |
| `/api/users/updateMe`              | PUT    | Private | Update account  |
| `/api/users/deleteMe`              | DELETE | Private | Delete account  |
| `/api/users/changeMyPassword/{id}` | PUT    | Private | Change password |

### Get logged user

```bash
[GET] http://localhost:3000/api/users/getMe
```

<details>
<summary>Response</summary>

```json
{
  "data": {
    "_id": "63bc7cf53e721990a8cc4ff8",
    "name": "Ruby",
    "lastName": "Doe",
    "email": "ruby@mail.com",
    "password": "$2a$12$vJ1Yf9Jkj700doCaSZBlgudPTOLlzpkGgOlB4fUzOwaKcYyQGfGJS",
    "role": "user",
    "active": true,
    "wishlist": [],
    "addresses": [],
    "createdAt": "2023-01-09T20:45:41.648Z",
    "updatedAt": "2023-01-09T20:45:41.648Z",
    "__v": 0
  }
}
```

</details>


### Update account

You can update logged user by sending an object like the following. You can update all the fields.

```bash
[PUT] http://localhost:3000/api/users/updateMe
```

```json
{
  "name": "Ruby",
  "email": "ruby@mail.com"
}
```

### Delete account

```bash
[DELETE] http://localhost:3000/api/users/deleteMe
```

### Change password

You can change password of any user exists by sending an object like the following and adding the `id` as a parameter: `/api/users/changePassword/{userId}`

```bash
[PUT] http://localhost:3000/api/users/changePassword/63bc802d3e721990a8cc5005
```

```json
{
  "currentPassword": "123456",
  "password": "1234",
  "passwordConfirm": "1234"
}
```

<details>
<summary>Response</summary>

```json
{
  "data": {
    "_id": "63bc802d3e721990a8cc5005",
    "name": "Admin",
    "email": "admin@mail.com",
    "password": "$2a$12$TfmUC4p.eR8HVDyXBGn4y.9EiO.54W5J78rBDxl9PWMuRQN0iMvwy",
    "role": "admin",
    "active": true,
    "wishlist": [],
    "addresses": [],
    "createdAt": "2023-01-09T20:59:25.738Z",
    "updatedAt": "2023-01-09T21:17:11.214Z",
    "__v": 0,
    "passwordChangedAt": "2023-01-09T21:17:11.214Z"
  }
}
```

</details>


## Category


Category Routes:

| Route                                | Type | Access | Description                  |
| ------------------------------------ | ---- | ------ | ---------------------------- |
| /api/categories/:categoryId          | GET  | Public | Get a single category        |
| /api/categories/?page=2&limit=1      | GET  | Public | Get all categories           |
| /api/categories/:categoryId/products | GET  | Public | Get all products by category |

### Get a single category

You can get a single category by adding the `id` as a parameter: `/categories/{categoryId}`

```bash
[GET] http://localhost:3000/api/categories/63bc88ec3e721990a8cc5064
```

<details>
<summary>Response</summary>

```json
{
  "page": 1,
  "result": 30,
  "data": [
    {
      "_id": "65c60d6e3c5df1b164b96acc",
      "title": "Vintage Denim Jacket",
      "slug": "vintage-denim-jacket",
      "description": "Classic and versatile, perfect for layering over any outfit.",
      "quantity": 50,
      "sold": 30,
      "price": 99.99,
      "priceAfterDiscount": 79.99,
      "colors": ["Blue", "Black"],
      "category": {
        "_id": "63b9d61375a3b24e4c17a724",
        "name": "Tops"
      },
      "subcategories": ["65c4d1fa82ee86b0afeb92cf", "65c4e1d7061fc9bd644fe260"],
      "brand": "65c60462e4b66e91ecc26af9",
      "ratingsAverage": 4.7,
      "ratingsQuantity": 50,
      "createdAt": "2024-02-09T13:04:00.261Z",
      "updatedAt": "2024-02-09T13:04:00.261Z"
    }
  ]
}
```

</details>


### Get all categories

You can access the list of categories by using the `/categories` endpoint.

```bash
[GET] http://localhost:3000/api/categories/
```

<details>
<summary>Response</summary>

```json
{
  "data": {
    "_id": "63b9d61375a3b24e4c17a724",
    "name": "Tops",
    "slug": "tops",
    "createdAt": "2023-01-07T20:29:07.908Z",
    "updatedAt": "2023-01-07T20:29:07.908Z",
    "__v": 0
  }
}
```

</details>

### Get all products by category

You can access the list of products by using the `/categories/{categoryId}/products` endpoint.

```bash
[GET] http://localhost:3000/api/categories/{categoryId}/products
```

<details>
<summary>Response</summary>

```json
{
  "data": {
    "_id": "63b9d61375a3b24e4c17a724",
    "name": "Tops",
    "slug": "tops",
    "createdAt": "2023-01-07T20:29:07.908Z",
    "updatedAt": "2023-01-07T20:29:07.908Z",
    "__v": 0
  }
}
```

</details>


### Category schema

| Attribute | Type   |
| --------- | ------ |
| name      | string |
| slug      | string |

---

## Subcategories

Sub-Category Routes:

| Route                              | Type | Access | Description                        |
| ---------------------------------- | ---- | ------ | ---------------------------------- |
| /api/subcategories/?page=2&limit=1 | GET  | Public | Get List of subCategories          |
| /api/subcategories/:id             | GET  | Public | Get subcategory by id              |
| /api/categories/:id/subcategories  | GET  | Public | Get all subcategories for category |

### Get all subcategories

You can access the list of subcategories by using the `/subcategories` endpoint.

```bash
[GET] http://localhost:3000/api/subcategories/
```

<details>
<summary>Response</summary>

```json
{
  "page": 1,
  "subcategories": [
    {
      "_id": "65c4d1484e9c14f746c20c9c",
      "name": "Shorts",
      "slug": "shorts",
      "category": "63b9d58a01dc8bc2a732c34e",
      "createdAt": "2023-01-07T20:30:51.709Z",
      "updatedAt": "2023-01-07T20:30:51.709Z",
      "__v": 0
    }
    // ...
  ]
}
```

</details>


### Get a single subcategory

You can get a single subcategory by adding the `id` as a parameter: `/subcategories/{id}`

```bash
[GET] http://localhost:3000/api/categories/${id}
```

<details>
<summary>Response</summary>

```json
{
  "page": 1,
  "subcategories": [
    {
      "_id": "65c4d1484e9c14f746c20c9c",
      "name": "Shorts",
      "slug": "shorts",
      "category": "63b9d58a01dc8bc2a732c34e",
      "createdAt": "2023-01-07T20:30:51.709Z",
      "updatedAt": "2023-01-07T20:30:51.709Z",
      "__v": 0
    }
    // ...
  ]
}
```

</details>

### Get all subcategories for a category

You can get all subcategories for specific category by adding the `categoryId` as a parameter: `categories/${categoryId}/subcategories`

```bash
[GET] http://localhost:3000/api/categories/${categoryId}/subcategories
```

<details>
<summary>Response</summary>

```json
{
  "page": 1,
  "subcategories": [
    {
      "_id": "65c4d1484e9c14f746c20c9c",
      "name": "Shorts",
      "slug": "shorts",
      "category": "63b9d58a01dc8bc2a732c34e",
      "createdAt": "2023-01-07T20:30:51.709Z",
      "updatedAt": "2023-01-07T20:30:51.709Z",
      "__v": 0
    }
    // ...
  ]
}
```
</details>


### Subcategory schema

| Attribute | Type     |
| --------- | -------- |
| title     | string   |
| slug      | string   |
| category  | ObjectId |

---

## Brands

Brand Routes:

| Route                      | Type | Access | Description     |
| -------------------------- | ---- | ------ | --------------- |
| /api/brand/?page=2&limit=1 | GET  | Public | Get all brands  |
| /api/brand/:brandId        | GET  | Public | Get brand by id |

### Get all brands

You can access the list of brands by using the `/brands` endpoint.

```bash
[GET] http://localhost:3000/api/brands/
```

<details>
<summary>Response</summary>

```json
{
  "page": 1,
  "result": 13,
  "data": [
    {
      "_id": "65c60462e4b66e91ecc26af9",
      "name": "Levi's",
      "createdAt": "2024-02-09T13:04:00.226Z",
      "updatedAt": "2024-02-09T13:04:00.226Z"
    }
    // ...
  ]
}
```
</details>


### Get brand by id

You can get a single brand by adding the `id` as a parameter: `/brands/{id}`

```bash
[GET] http://localhost:3000/api/categories/${id}
```

<details>
<summary>Response</summary>

```json
{
  "data": {
    "_id": "65c60462e4b66e91ecc26af9",
    "name": "Levi's",
    "createdAt": "2024-02-09T13:04:00.226Z",
    "updatedAt": "2024-02-09T13:04:00.226Z"
  }
}
```
</details>

### Brand schema

| Attribute | Type   |
| --------- | ------ |
| name      | string |

## Products

Product Routes:

| Route                                  | Type | Access | Description                    |
| -------------------------------------- | ---- | ------ | ------------------------------ |
| /api/products/:productId               | GET  | Public | Get a product by id            |
| /api/products/                         | GET  | Public | Get all products               |
| /api/products/related/:productId/      | GET  | Public | Get related products           |
| /api/products/search                   | POST | Public | Search for a product by price  |
| /api/products?sortedBy=price           | GET  | Public | Sort results                   |
| /api/products?keyword=Clark,Olsen      | GET  | Public | Search by title or description |
| /api/products?ratingsAverage[gte]=1.6  | GET  | Public | Filter results                 |
| /api/products?fields=title,description | GET  | Public | Field limiting                 |

### Get a product by id

You can get a single product by adding the `id` as a parameter: `/api/products/{id}`

```bash
[GET] http://localhost:3000/api/products/63bc8e4b3e721990a8cc5089
```


<details>
<summary>Response</summary>

```json
{
  "_id": "65c60d6e3c5df1b164b96acc",
  "title": "Vintage Denim Jacket",
  "slug": "vintage-denim-jacket",
  "description": "Classic and versatile, perfect for layering over any outfit.",
  "quantity": 50,
  "sold": 30,
  "price": 99.99,
  "priceAfterDiscount": 79.99,
  "colors": ["Blue", "Black"],
  "category": {
    "_id": "63b9d61375a3b24e4c17a724",
    "name": "Tops"
  },
  "subcategories": ["65c4d1fa82ee86b0afeb92cf", "65c4e1d7061fc9bd644fe260"],
  "brand": "65c60462e4b66e91ecc26af9",
  "ratingsAverage": 4.7,
  "ratingsQuantity": 50,
  "createdAt": "2024-02-09T13:04:00.261Z",
  "updatedAt": "2024-02-09T13:04:00.261Z"
}
```
</details>


### Get all products

You can access the list of 200 products by using the `/api/products` endpoint.

```bash
[GET] http://localhost:3000/api/products
```

<details>
<summary>Response</summary>

```json
{
  "results": 2,
  "paginationResult": {
    "currentPage": 1,
    "limit": 50,
    "numberOfPages": 1
  },
  "data": [
    {
      "_id": "65c60d6e3c5df1b164b96acc",
      "title": "Vintage Denim Jacket",
      "slug": "vintage-denim-jacket",
      "description": "Classic and versatile, perfect for layering over any outfit.",
      "quantity": 50,
      "sold": 30,
      "price": 99.99,
      "priceAfterDiscount": 79.99,
      "colors": ["Blue", "Black"],
      "category": {
        "_id": "63b9d61375a3b24e4c17a724",
        "name": "Tops"
      },
      "subcategories": ["65c4d1fa82ee86b0afeb92cf", "65c4e1d7061fc9bd644fe260"],
      "brand": "65c60462e4b66e91ecc26af9",
      "ratingsAverage": 4.7,
      "ratingsQuantity": 50,
      "createdAt": "2024-02-09T13:04:00.261Z",
      "updatedAt": "2024-02-09T13:04:00.261Z"
    }
    // ...
  ]
}
```
</details>


### Get related products

You can get related product by adding the `/api/products/related/{id}` endpoint.

```bash
[GET] http://localhost:3000/api/products/related/{productId}
```

<details>
<summary>Response</summary>

```json
[
  {
    "_id": "65c60d6e3c5df1b164b96acc",
    "title": "Vintage Denim Jacket",
    "slug": "vintage-denim-jacket",
    "description": "Classic and versatile, perfect for layering over any outfit.",
    "quantity": 50,
    "sold": 30,
    "price": 99.99,
    "priceAfterDiscount": 79.99,
    "colors": ["Blue", "Black"],
    "category": {
      "_id": "63b9d61375a3b24e4c17a724",
      "name": "Tops"
    },
    "subcategories": ["65c4d1fa82ee86b0afeb92cf", "65c4e1d7061fc9bd644fe260"],
    "brand": "65c60462e4b66e91ecc26af9",
    "ratingsAverage": 4.7,
    "ratingsQuantity": 50,
    "createdAt": "2024-02-09T13:04:00.261Z",
    "updatedAt": "2024-02-09T13:04:00.261Z"
  }
  // ...
]
```
</details>


### Search for a product by price

You can search for a product by price by sending an object like the following.

```bash
[GET] http://localhost:3000/api/products/search
```

```json
{
  "filters": {
    "price": [4, 20]
  }
}
```

### Search by title or description

To search by title or description the API needs to be called with the `keyword` set word that you want.

```bash
[GET] http://localhost:3000/api/products/?keyword=Classic
```

<details>
<summary>Response</summary>

```json
{
  "results": 1,
  "paginationResult": {
    "currentPage": 1,
    "limit": 50,
    "numberOfPages": 1
  },
  "data": [
    {
      "_id": "65c60d6e3c5df1b164b96acc",
      "title": "Vintage Denim Jacket",
      "slug": "vintage-denim-jacket",
      "description": "Classic and versatile, perfect for layering over any outfit.",
      "quantity": 50,
      "sold": 30,
      "price": 99.99,
      "priceAfterDiscount": 79.99,
      "colors": ["Blue", "Black"],
      "category": {
        "_id": "63b9d61375a3b24e4c17a724",
        "name": "Tops"
      },
      "subcategories": ["65c4d1fa82ee86b0afeb92cf", "65c4e1d7061fc9bd644fe260"],
      "brand": "65c60462e4b66e91ecc26af9",
      "ratingsAverage": 4.7,
      "ratingsQuantity": 50,
      "createdAt": "2024-02-09T13:04:00.261Z",
      "updatedAt": "2024-02-09T13:04:00.261Z"
    }
    // ..
  ]
}
```
</details>


### Filter results

To Filter results the API needs to be called with the `ratingsAverage[gte]` set number that you want

```bash
[GET] http://localhost:3000/api/products/?ratingsAverage[gte]=4.7
```

<details>
<summary>Response</summary>

```json
{
  "page": 1,
  "result": 16,
  "data": [
    {
      "_id": "65c60d6e3c5df1b164b96acc",
      "title": "Vintage Denim Jacket",
      "slug": "vintage-denim-jacket",
      "description": "Classic and versatile, perfect for layering over any outfit.",
      "quantity": 50,
      "sold": 30,
      "price": 99.99,
      "priceAfterDiscount": 79.99,
      "colors": ["Blue", "Black"],
      "category": {
        "_id": "63b9d61375a3b24e4c17a724",
        "name": "Tops"
      },
      "subcategories": ["65c4d1fa82ee86b0afeb92cf", "65c4e1d7061fc9bd644fe260"],
      "brand": "65c60462e4b66e91ecc26af9",
      "ratingsAverage": 4.7,
      "ratingsQuantity": 50,
      "createdAt": "2024-02-09T13:04:00.261Z",
      "updatedAt": "2024-02-09T13:04:00.261Z"
    }
  ]
  // ...
}
```
</details>


### Field limiting

To field limiting the API needs to be called with the `fields` set attribute that you want to display.

```bash
[GET] http://localhost:3000/api/products/?fields=title,price
```

<details>
<summary>Response</summary>

```json
{
  "results": 2,
  "paginationResult": {
    "currentPage": 1,
    "limit": 50,
    "numberOfPages": 1
  },
  "data": [
    {
      "_id": "65c60d6e3c5df1b164b96acc",
      "title": "Vintage Denim Jacket",
      "price": 99.99,
      "colors": ["Blue", "Black"],
      "category": {
        "_id": "63b9d61375a3b24e4c17a724",
        "name": "Tops"
      }
    }
    // ..
  ]
}
```
</details>


### Product schema

| Attribute          | Type       |
| ------------------ | ---------- |
| title              | string     |
| slug               | string     |
| description        | string     |
| quantity           | Number     |
| price              | Number     |
| sold               | Number     |
| priceAfterDiscount | Number     |
| Colors             | arrays     |
| imageCover         | string     |
| images             | images     |
| category           | ObjectId   |
| subcategories      | ObjectId[] |
| brand              | ObjectId   |
| ratingsAverage     | Number     |
| ratingsAverage     | Number     |
| ratingsQuantity    | Number     |
| shipping           | Boolean    |

---

## Addresses

Addresses Routes:

| Route                       | Type   | Access       | Description            |
| --------------------------- | ------ | ------------ | ---------------------- |
| /api/addressess/            | POST   | Private/User | Add user address       |
| /api/addressess/:addressId/ | DELETE | Private/User | Remove user address    |
| /api/addressess/            | GET    | Private/User | Get all user addresses |

### Add user address

You can add address to user addresses list by sending an object like the following to `/api/addressess/` endpoint.

```
[POST] http://localhost:3000/api/addressess
```

<details>
<summary>Response</summary>

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "company": "Grid",
  "address": "985 Pinnickinnick Street",
  "country": "Poland",
  "city": "Olkusz",
  "state": "Oklahoma",
  "zipCode": "08872",
  "phone": "123-456-789"
}
```
</details>

### Remove user address

You can remove address from user addresses list by adding the `id` as a parameter: `/api/addressess/{id}`

```bash
[DELETE] http://localhost:3000/api/addressess/{addressId}
```

<details>
<summary>Response</summary>

```json
{
  "status": "success",
  "message": "Address removed successfully.",
  "data": []
}
```
</details>


### Get user addresses

You can access the list of addresses by using the `/api/addressess` endpoint.

```
[GET] http://localhost:3000/api/addressess
```

<details>
<summary>Response</summary>

```json
{
  "status": "success",
  "results": 1,
  "data": [
    {
      "firstName": "John",
      "lastName": "Doe",
      "company": "Grid",
      "address": "985 Pinnickinnick Street",
      "country": "Poland",
      "city": "Olkusz",
      "state": "Oklahoma",
      "zipCode": "08872",
      "phone": "123-456-789",
      "_id": "65c62570952c701681232b91"
    }
  ]
}
```
</details>

---

## Cart

Cart Routes:

| Route              | Type   | Access       | Description           |
| ------------------ | ------ | ------------ | --------------------- |
| /api/cart/         | POST   | Private/User | Add product to cart   |
| /api/cart/         | GET    | Private/User | Get cart              |
| /api/cart/:itemId/ | DELETE | Private/User | Remove item from cart |
| /api/cart/         | DELETE | Private/User | Clear cart            |
| /api/cart/:itemId/ | PUT    | Private/User | Update item in cart   |

### Add product to cart

You can Add product to cart by sending an object like the following to `/cart/`

```bash
[POST] http://localhost:3000/api/cart/
```

```json
{
  "productId": "636e6bef6c34aa33724e6cdd",
  "color": "Black",
  "quantity": 10
}
```

### Get cart

```bash
[GET] http://localhost:3000/api/cart
```

<details>
<summary>Response</summary>

```json
{
  "status": "success",
  "numOfCartItems": 2,
  "data": {
    "_id": "63b08822a8808232467c2993",
    "cartItems": [
      {
        "product": "636e6bef6c34aa33724e6cdd",
        "quantity": 1,
        "color": "Black",
        "price": 9.99,
        "_id": "63b08822a8808232467c2994"
      }
      // ...
    ],
    "user": "63aeed564a116b073bc4d0cf",
    "createdAt": "2022-12-31T19:06:10.762Z",
    "updatedAt": "2022-12-31T19:11:18.797Z",
    "__v": 1
  }
}
```
</details>


### Update item in cart

You can update specific cart item by sending an object like the following and adding the `id` as a parameter: `/cart/{id}`

```bash
[PUT] http://localhost:3000/api/cart/{itemId}
```

```json
{
  "quantity": 2
}
```

### Remove item from cart

You can remove item from cart by adding the `id`as a parameter: `/api/cart/{id}`

```bash
[DELETE] http://localhost:3000/api/cart/{itemId}
```

### Clear cart

```bash
[DELETE] http://localhost:3000/api/cart/
```

### Cart Schema

| Attribute               | Type   |
| ----------------------- | ------ |
| cartItems               | arrays |
| totalCartPrice          | Number |
| totalPriceAfterDiscount | Number |
