# Stock Trades API

This is a simple REST API to manage a collection of stock trades using Node.js and Express. The trades data is stored in a JSON file.

## API Endpoints

### Create a New Trade

- **URL**: `/trades`
- **Method**: `POST`
- **Request Body**: 
  ```json
  {
    "type": "buy",
    "user_id": 23,
    "symbol": "ABX",
    "shares": 30,
    "price": 134
  }


### Success Response

* Code: 201
* Content: JSON
    ```json
    {
    "id": 1,
    "type": "buy",
    "user_id": 23,
    "symbol": "ABX",
    "shares": 30,
    "price": 134
    }

### Get All Trades
URL: /trades
Method: GET
Success Response:
* Code: 200
* Content: json
    ```json
    {
    "trades": [
        {
        "id": 1,
        "type": "buy",
        "user_id": 23,
        "symbol": "ABX",
        "shares": 30,
        "price": 134
        }
    ]
    }

### Get Trade by ID
URL: /trades/:id
Method: GET
Success Response:
* Code: 200
* Content:

    ```json
    {
    "id": 1,
    "type": "buy",
    "user_id": 23,
    "symbol": "ABX",
    "shares": 30,
    "price": 134
    }
Error Response:
Code: 404
Content: ID not found


### Delete Trade by ID
URL: /trades/:id
Method: DELETE
Success Response:
* Code: 200
Content: Trade deleted successfully
Error Response:
Code: 404
Content: ID not found

### Update Trade Price by ID
URL: /trades/:id
Method: PATCH
* Request Body:
    ```json
    {
    "price": 150
    }
Success Response:
Code: 200
Content: Trade updated successfully
Error Response:
Code: 404
Content: ID not found


### Project Setup
Clone the repository

    git clone https://github.com/yourusername/stock-trades-api.git
    cd stock-trades-api

Install dependencies

    npm install

Start the application

    npm start

The API will be available at http://localhost:3000/trades

### Deployed to Render
The application is deployed to Render. You can access the live API at:
https://stock-trades-api.onrender.com/trades


###### Logging This API uses the morgan middleware for logging HTTP requests. The logs include:
    HTTP method
    Request URL
    Response status code
    Response time
    Date and time of the request
License
This project is licensed under the MIT License.