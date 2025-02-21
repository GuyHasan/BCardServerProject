# Node.js Express User Management and Card System

## Description
This project is a user registration and management system built with Node.js and Express. It provides authentication using JWT, password encryption, and a card management system where users can perform CRUD operations on cards.

## Features
- User registration and login with JWT authentication
- Password encryption using bcrypt
- Card management system (CRUD operations)
- MongoDB database integration
- Input validation with Joi
- Logging with Morgan
- CORS support
- Support for multiple environments (local and cloud/Atlas)
- Proper HTTP response handling with status codes and error messages
- Initial data setup for users and cards
- Mongoose models for structured database management
- Admins can update business numbers while ensuring uniqueness
- Error logs (status code 400 and above) are saved in a log file with date-based filenames

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
| No. | URL | Method | Authorization | Action |
|-----|-----|--------|--------------|--------|
| 1 | /users | POST | All | Register user |
| 2 | /users/login | POST | All | Login user |
| 3 | /users | GET | Admin | Get all users |
| 4 | /users/:id | GET | User/Admin | Get user by ID |
| 5 | /users/:id | PUT | User | Edit user |
| 6 | /users/:id | PATCH | User | Change business status |
| 7 | /users/:id | DELETE | User/Admin | Delete user |

### Card Endpoints
| No. | URL | Method | Authorization | Action |
|-----|-----|--------|--------------|--------|
| 1 | /cards | GET | All | Get all cards |
| 2 | /cards/my-cards | GET | Registered User | Get user cards |
| 3 | /cards/:id | GET | All | Get specific card |
| 4 | /cards | POST | Business User | Create new card |
| 5 | /cards/:id | PUT | Owner | Edit card |
| 6 | /cards/:id | PATCH | Registered User | Like card |
| 7 | /cards/:id | DELETE | Owner/Admin | Delete card |

## API Request Formats

### Register User
**Notes:**
- "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number, and one of the following characters !@#$%^&*-
- "phone" must be a standard Israeli phone number
- "email" must be a standard email
- "image/url" must be a standard URL
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
- "email" must be a standard email
- "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number, and one of the following characters !@#$%^&*-
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```


### Update User
**Notes:**
- "phone" must be a standard Israeli phone number
- "image/url" must be a standard URL
- You will need to provide a token to get an answer from this API
- You need to be the registered user or Admin to get an answer from this API
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


### Create Card
**Notes:**
- "phone" must be a standard Israeli phone number
- "email" must be a standard email
- "web" must be a standard URL
- "image/url" must be a standard URL
- You will need to provide a token to get an answer from this API
- You will need to be a Business type user to get an answer from this API
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


### Edit Card
**Notes:**
- "phone" must be a standard Israeli phone number
- "email" must be a standard email
- "web" must be a standard URL
- "image/url" must be a standard URL
- You will need to provide a token to get an answer from this API
- You must be the user who created the card or an admin in order to update the business card
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

