# BCard Server

## Description

This project is a user registration and management system built with Node.js and Express. It provides authentication using JWT, password encryption, and a card management system where users can perform CRUD operations on cards.

## Setup Environment Variables

To get started with the project, you will need to create your own `.env` file.

1. Copy the contents of the `.env.example` file to a new `.env` file in the root directory.
2. Replace the placeholder values with the correct values for your environment:
    - **ATLAS_CONNECTION_STRING**: Your MongoDB connection string.
    - **SECRET_WORD**: A secret string used for JWT signing.
    - **PORT**: The port to run your application on (default: `8181`).

## CORS Middleware

Cross-Origin Resource Sharing (CORS) is a security feature implemented by web browsers to control how resources on your server can be accessed from different origins (domains, protocols, or ports). In this project, CORS is used to allow or restrict the types of requests that can be made to the server.

### Default CORS Setup

The CORS configuration for this project is handled in the `cors.js` file located in the `./middlewares` folder. By default, the middleware allows requests from certain origins, but you may need to add new addresses (such as from a different frontend domain or testing environment).

### How to Add a New Address to CORS

If you need to allow a new address (domain) to access your backend, you can modify the CORS configuration in the `cors.js` file.

1. **Open the `cors.js` file** in the `./middlewares` folder.
2. **Locate the CORS configuration**, which typically looks like this:

    ```javascript
    const corsOptions = {
    	origin: ["http://localhost:3000", "https://your-domain.com"], // List of allowed origins
    	methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    	allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    };
    ```

3. **Add the new address** (origin) to the `origin` array in the configuration. For example, if you want to add `https://new-frontend.com` as an allowed origin:

    ```javascript
    const corsOptions = {
    	origin: ["http://localhost:3000", "https://your-domain.com", "https://new-frontend.com"], // New address added
    	methods: ["GET", "POST", "PUT", "DELETE"],
    	allowedHeaders: ["Content-Type", "Authorization"],
    };
    ```

4. **Save the file** after making the changes.

### Restart the Server

After modifying the CORS configuration, restart the server to apply the new settings:

-   If you're in development mode: `npm run dev`
-   If you're in production mode: `npm run prod`

### Test the New CORS Setting

To ensure the new address is properly allowed, test making a request from the newly added origin (e.g., `https://new-frontend.com`). If everything is set up correctly, the request should succeed without any CORS-related errors.

## Features

-   User registration and login with JWT authentication
-   Password encryption using bcrypt
-   Card management system (CRUD operations)
-   MongoDB database integration
-   Input validation with Joi
-   Logging with Morgan
-   CORS support
-   Support for multiple environments (local and cloud/Atlas)
-   Proper HTTP response handling with status codes and error messages
-   Initial data setup for users and cards
-   Mongoose models for structured database management
-   Admins can update business numbers while ensuring uniqueness
-   Error logs (status code 400 and above) are saved in a log file with date-based filenames

## Libraries Used

This Is the Libraries used for building the project:

-   **bcryptjs** (`^2.4.3`): Used for password hashing to ensure secure password storage.
-   **chalk** (`^5.4.1`): A library to style the terminal output, often used for logging in color.
-   **config** (`^3.3.12`): Provides a simple solution for managing application configuration in different environments.
-   **cors** (`^2.8.5`): Enables Cross-Origin Resource Sharing (CORS) to allow API calls from different origins.
-   **cross-env** (`^7.0.3`): Allows setting environment variables across different operating systems.
-   **dotenv** (`^16.4.7`): Loads environment variables from a `.env` file into `process.env`.
-   **express** (`^4.21.2`): A fast and minimal web framework for Node.js.
-   **joi** (`^17.13.3`): Used for schema validation of user input and API data.
-   **jsonwebtoken** (`^9.0.2`): Used to sign and verify JWT tokens for user authentication.
-   **lodash** (`^4.17.21`): A utility library providing various helpful functions for working with arrays, numbers, and objects.
-   **mongoose** (`^8.10.0`): An ODM (Object Data Modeling) library for MongoDB and Node.js, used for data modeling.
-   **morgan** (`^1.10.0`): HTTP request logger middleware for Node.js, often used for logging requests.

## Command Usage

These are some commands you can run to interact with the application:

-   **`npm test`**: This runs the test script, currently outputs an error message as no tests are specified.
-   **`npm start`**: Runs the app in production mode.
-   **`npm run dev`**: Starts the app in development mode using `nodemon` and sets `NODE_ENV=development` using `cross-env`. This allows for automatic server restarts on file changes. In this mode, the application connects to a local MongoDB instance running on your machine at `mongodb://localhost:27017/BCardServerProject`.
-   **`npm run prod`**: Starts the app in production mode with the environment variable `NODE_ENV=production`. In this mode, the application connects to MongoDB hosted on Atlas (a cloud MongoDB service), which is ideal for production environments.
-   **⚠️ `npm run clearDatabase`**: **Caution:** This command will **clear** your database. It will remove all data in the database, so it should only be used with care during development or when you intend to reset the data.

## Project Structure

```
auth
    providers
        jwt.js
    authServices.js
cards
    helpers
        generateBizNum.js
        normalizeCard.js
    models
        mongoDB
            cardSchema.js
    routes
        cardRouter.js
    services
        mongoDB
            mongoService.js
        cardServices.js
    validation
        joi
            joiCardValidation.js
        cardValidator.js
config
    default.json
    development.json
    production.json
db
    mongodb
        connectToAtlas.js
        connectToMongoLocally.js
    dbService.js
helpers
    mongoDB
        Address.js
        Image.js
        mongooseValidators.js
        Name.js
logs
    2025-02-19.log
middlewares
    cors.js
    errorLogger.js
router
    router.js
users
    helpers
        bcrypt.js
    models
        mongoDB
            userSchema.js
    routes
        usersRouter.js
    services
        mongoService
            mongoService.js
        userServices.js
    validation
        joi
            loginValidation.js
            registerValidation.js
        userValidator.js
utils
    logger
        loggers
            morganLogger.js
        loggerService.js
    clearDatabase.js
    handleErrors.js
    seedDB.js
    timeHelper.js
.env
.gitignore
app.js
package-lock.json
package.json
```

## Installation

1. Clone the repository:

```sh
git clone <repository_url>
cd <project_directory>
```

2. Install dependencies:

```sh
npm install
```

3. Set up environment variables:

    - Copy `.env.example` to `.env`
    - Configure MongoDB connection and JWT secrets

4. Start the application:

```sh
npm start
```

## API Endpoints

**Note:** Authorization is performed via the received token from the login POST request. The token should be sent in the request headers as `x-auth-token`.

### User Endpoints

| No. | URL          | Method | Authorization | Action                 |
| --- | ------------ | ------ | ------------- | ---------------------- |
| 1   | /users       | POST   | All           | Register user          |
| 2   | /users/login | POST   | All           | Login user             |
| 3   | /users       | GET    | Admin         | Get all users          |
| 4   | /users/:id   | GET    | User/Admin    | Get user by ID         |
| 5   | /users/:id   | PUT    | User          | Edit user              |
| 6   | /users/:id   | PATCH  | User          | Change business status |
| 7   | /users/:id   | DELETE | User/Admin    | Delete user            |

### Card Endpoints

| No. | URL                  | Method | Authorization   | Action                |
| --- | -------------------- | ------ | --------------- | --------------------- |
| 1   | /cards               | GET    | All             | Get all cards         |
| 2   | /cards/my-cards      | GET    | Registered User | Get user cards        |
| 3   | /cards/:id           | GET    | All             | Get specific card     |
| 4   | /cards               | POST   | Business User   | Create new card       |
| 5   | /cards/:id           | PUT    | Owner           | Edit card             |
| 6   | /cards/:id           | PATCH  | Registered User | Like card             |
| 7   | /cards/:id           | DELETE | Owner/Admin     | Delete card           |
| 8   | /cards/:id/bizNumber | PATCH  | Admin           | Update card bizNumber |

# API Request Formats

## Users

### Register User

**Notes:**

-   "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number, and one of the following characters !@#$%^&\*-
-   "phone" must be a standard Israeli phone number
-   "email" must be a standard email
-   "image/url" must be a standard URL

```json
{
	"name": {
		"first": "John",
		"middle": "M.",
		"last": "Doe"
	},
	"phone": "1234567890",
	"email": "john@example.com",
	"password": "SecurePass123!",
	"image": {
		"url": "https://example.com/image.jpg",
		"alt": "Profile image"
	},
	"address": {
		"state": "CA",
		"country": "USA",
		"city": "Los Angeles",
		"street": "Main St",
		"houseNumber": 10,
		"zip": 90001
	},
	"isBusiness": false
}
```

### Login User

**Notes:**

-   "email" must be a standard email
-   "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number, and one of the following characters !@#$%^&\*-

```json
{
	"email": "john@example.com",
	"password": "SecurePass123!"
}
```

### Get All Users

**Notes:**

-   You will need to provide a token to get an answer from this api
-   You will need to be Admin type user to get an answer from this api

### Get User By Id

**Notes:**

-   You will need to provide a token to get an answer from this api
-   You will need to be the registered user or Admin type user to get an answer from this api

### Update User

**Notes:**

-   "phone" must be a standard Israeli phone number
-   "image/url" must be a standard URL
-   You will need to provide a token to get an answer from this API
-   You need to be the registered user to get an answer from this API

```json
{
	"name": {
		"first": "John Updated",
		"middle": "M.",
		"last": "Doe"
	},
	"phone": "0987654321",
	"image": {
		"url": "https://example.com/new-image.jpg",
		"alt": "Updated profile image"
	},
	"address": {
		"state": "NY",
		"country": "USA",
		"city": "New York",
		"street": "Broadway",
		"houseNumber": 50,
		"zip": 10001
	}
}
```

### Patch User's Business Status

**Notes:**

-   You will need to provide a token to get an answer from this api
-   You will need to be the registered user to get an answer from this api

### Delete User

**Notes:**

-   You will need to provide a token to get an answer from this api
-   You will need to be the registered user or Admin type user to get an answer from this api

## Cards

### Get All Cards

**Notes:**

-   You won't need to provide a token or to be a registered user to get an answer from this api

### Get Card By Id

**Notes:**

-   You won't need to provide a token or to be a registered user to get an answer from this api

### Get All My Cards

**Notes:**

-   You will need to provide a token to get an answer from this api

### Create Card

**Notes:**

-   "phone" must be a standard Israeli phone number
-   "email" must be a standard email
-   "web" must be a standard URL
-   "image/url" must be a standard URL
-   You will need to provide a token to get an answer from this API
-   You will need to be a Business type user to get an answer from this API

```json
{
	"title": "Business Card",
	"subtitle": "Your Best Partner",
	"description": "A great business card for professionals.",
	"phone": "1234567890",
	"email": "business@example.com",
	"web": "https://business.com",
	"image": {
		"url": "https://example.com/card.jpg",
		"alt": "Business card image"
	},
	"address": {
		"state": "CA",
		"country": "USA",
		"city": "San Francisco",
		"street": "Market St",
		"houseNumber": 100,
		"zip": 94103
	}
}
```

### Update Card

**Notes:**

-   "phone" must be a standard Israeli phone number
-   "email" must be a standard email
-   "web" must be a standard URL
-   "image/url" must be a standard URL
-   You will need to provide a token to get an answer from this API
-   You must be the user who created the card or an admin in order to update the business card

```json
{
	"title": "Updated Business Card",
	"subtitle": "New Subtitle",
	"description": "Updated description of the business card.",
	"phone": "1234567890",
	"email": "business@example.com",
	"web": "https://business.com",
	"image": {
		"url": "https://example.com/updated-card.jpg",
		"alt": "Updated business card image"
	},
	"address": {
		"state": "CA",
		"country": "USA",
		"city": "San Francisco",
		"street": "Market St",
		"houseNumber": 100,
		"zip": 94103
	}
}
```

### Like/Unlike Card

**Notes:**

-   Please note that this EndPoint will unlike an already liked card
-   You will need to provide a token to get an answer from this api

### Delete Card

**Notes:**

-   You will need to provide a token to get an answer from this api
-   You must be the user who created the card or an admin in order to delete the business card

### Update Card bizNumber

**Notes:**

-   Only Admins can change card bizNumbers.
-   The bizNumber must be unique as it cannot be taken by another card.
-   bizNumber must be 7 digit number.

```json
{
	"bizNumber": 1111111
}
```
