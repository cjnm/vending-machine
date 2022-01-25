# Introduction
---
Vending machine was build to simulate a vending machine which takes in order and coin and dispenses the order with changes back to buyer.
If there is no inventory available or the coin inserted is not sufficient then the buyer is issued with refund.
User can also return the products they have bought and as the maximum capacity of vending machine for each product is 10, refund is only processed until the inventory gets to 10 units.
# Setup
---
## Prerequisite
- NodeJS (latest LTS version)
- MongoDB

## Install 
- Install dependency
```
npm install
```
- Setup environment variable
```
- cp .env.example .env
```
- Seed database
```
npm seed
```
- Test
```
npm test
```
- Start
```
npm start
```

# Implementation
---
## Endpoints
Currently there are three endpoints available, one for purchase, one for return and one to check the inventory status.

### Status Codes
Vending machine API returns the following status codes.

| Status Code | Description   |
| :---        |    :----:     |
| 200         | `OK`          |
| Paragraph   | `BAD REQUEST` |

### Inventory Endpoint
`GET /api/inventory`
#### Response

```
{ 
    status: integer,
    error: string,
    inventories: [string] 
}
```
#### Response Example

```
{
    "status": 200,
    "error": null,
    "inventories": [
        {
            "name": "coke",
            "price": 20,
            "quantity": 5
        },
        {
            "name": "pepsi",
            "price": 25,
            "quantity": 10
        },
        {
            "name": "dew",
            "price": 30,
            "quantity": 10
        }
    ]
}
```
The `error` attribute contains a message used to indicate errors.

The `inventories` attribute contains data on all the inventories available.

### Purchase endpoint
`POST /api/purchase`

#### Payload

```
{
    "products": [
        {
            "item": "coke",
            "quantity": 1 
        }
    ],
    "coin": 25
}
```

#### Response

```
{
    "error": boolean,
    "message": string,
    "products": [string],
    "refund": integer
}
```
#### Response Example

```
{
    "error": false,
    "message": null,
    "products": [
        {
            "item": "coke",
            "quantity": 1
        }
    ],
    "refund": 5
}
```
The `error` attribute contains a message used to indicate errors.

The `products` attribute contains product data returned after purchase.

The `refund` attribute contains refund amount.

### Return Endpoint
`POST /api/return`

#### Payload

```
{
    "products": [
        {
            "item": "coke",
            "quantity": 1
        }
    ]
}
```

#### Response

```
{
    "error": boolean,
    "message": string,
    "products": [string],
    "refund": integer
}
```
#### Response Example

```
{
    "error": false,
    "message": null,
    "products": null,
    "refund": 20
}
```
The `error` attribute contains a message used to indicate errors.

The `products` attribute contains product data returned in case refund failed.

The `refund` attribute contains refund amount.

