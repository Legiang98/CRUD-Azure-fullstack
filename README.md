# Authentication Steps

## Add our boilerplate
1. Git clone express --cc repo
2. Run yarn / npm install

## Create a new user in the database
1. Create a form within a view
2. Create route that’ll process the form’s post request
3. Create a database connection using .env file
4. Grab form input and insert into database
5. Add express-validation package
6. Validate user input on backend
7. Validate user input on frontend
8. Hash our user’s password
9. Store user in database

## Login user (update user session, return auth cookie)
1. Install passport
2. Configure passport with local strategy

## Protect routes and only permit entry with authorization cookie

## Create logout button

## Create login page

# Authentication Backend Development Plan

## 1. Database Connection
- Implement and test `src/db/pool.js` to ensure your backend can connect to the SQL database.

## 2. Models
- Implement `src/models/user.model.js` and `src/models/role.model.js` with class definitions and methods for CRUD operations.
- Initialize models in `src/models/index.js`.

## 3. Configuration
- Set up `src/config/auth.config.js` for JWT settings.
- Set up `src/config/db.config.js` for database connection settings (using environment variables).

## 4. Middlewares
- Implement `src/middlewares/jwt.middleware.js` for token verification.
- Implement `src/middlewares/signup.middleware.js` for duplicate user/email checks.
- Export all middlewares in `src/middlewares/index.js`.

## 5. Validators
- Implement `src/validators/authValidator.js` for validating register and login requests.

## 6. Controllers
- Implement `src/controllers/auth.controller.js` for register, login, logout logic.
- Implement `src/controllers/user.controller.js` for user profile and update logic.

## 7. Routes
- Set up `src/routes/auth.routes.js` for authentication endpoints.
- Set up `src/routes/user.routes.js` for user-related endpoints.

## 8. Server Setup
- Configure `server.js` to use all routes, middlewares, and start the Express app.

## 9. Testing
- Test each route and feature (register, login, protected routes, etc.)
- Use tools like Postman or Insomnia for API testing.

---

**After completing and testing `db/pool.js`, proceed to implement and test your models (`user.model.js`, `role.model.js`), then move on to configuration, middlewares, validators, controllers, routes, and finally server setup and testing.**
