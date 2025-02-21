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

### Authentication
- `POST /users/register` - Register a new user
- `POST /users/login` - Login and receive JWT token

### Cards
- `POST /cards` - Create a new card
- `GET /cards` - Retrieve all cards
- `GET /cards/:id` - Get a single card
- `PUT /cards/:id` - Update a card
- `DELETE /cards/:id` - Delete a card

## Technologies Used
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JWT for authentication
- bcrypt for password hashing
- Joi for validation
- Morgan for logging

## Contributing
Feel free to open issues or submit pull requests.

## License
This project is licensed under the MIT License.

