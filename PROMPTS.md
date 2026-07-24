# AI Usage Prompt History

## Project Start

Date: 23 July 2026

## Tool:
OpenAI Codex

## Prompt:
Analyze this repository and tell me the current folder structure. Do not modify any files.

## Purpose:
Verify AI access to the repository before making changes.

## Result:
Confirmed repository structure and identified current project setup.

---

## Frontend React TypeScript Initialization

Include:
- React + TypeScript + Vite setup
- Installed dependencies: axios and react-router-dom
- Created frontend folder structure:
  - components
  - pages
  - services
  - context
- Removed unnecessary Vite starter files

## Purpose:
Preparing the frontend foundation for the Car Dealership Inventory System.


## Tool:
OpenAI Codex

## Prompt:
We are following strict Test Driven Development (TDD).

Task:
Create a failing integration test for retrieving a single car by id.

Create:

src/tests/cars/get-single-car.test.ts

Test endpoint:

GET /api/cars/:id

Requirements:

- Use Jest and Supertest.
- Mock authentication middleware.
- Mock Car.findById().

Verify:

- Car.findById() is called with the provided id.
- Returned car is included in response.

Expected response:

HTTP 200

{
 success: true,
 car: expect.any(Object)
}

Do not implement controller or route.

Do not modify application files.

## Purpose:
Create the failing get single car test following the Red phase of TDD.

## Result:
Created get-single-car.test.ts and confirmed failure because GET /api/cars/:id was not implemented.

---

## Tool:
OpenAI Codex

## Prompt:
We are in the Green phase of Test Driven Development (TDD).

Implement the minimum Get Single Car API.

Requirements:

- Add GET /api/cars/:id endpoint.
- Use Car.findById(id).
- Return car data with success response.
- Return 404 when car is not found.
- Protect route using existing authentication middleware.

Do not add extra features.

## Purpose:
Implement the minimum Get Single Car API during the Green phase of TDD.

## Result:
Added GET /api/cars/:id endpoint with Car.findById() logic and not-found handling. Verified tests and TypeScript build passed successfully.

---

## Tool:
OpenAI Codex

## Prompt:
Create a clean backend folder structure inside backend/src directory. Create only folders and placeholder files.

## Purpose:
Initialize a professional backend architecture before implementation.

## Result:
Created backend/src folders and placeholder app.ts and server.ts files.

---

## Tool:
OpenAI Codex

## Prompt:
Update only backend/tsconfig.json for a professional Node.js + Express + TypeScript project.

Requirements:
- Source files are inside src folder.
- Compiled JavaScript should go into dist folder.
- Use CommonJS modules.
- Target modern Node.js.
- Enable strict type checking.
- Enable source maps.
- Keep configuration clean and production friendly.

Do not modify any other files.

## Purpose:
Configure the TypeScript compiler for a clean production-ready backend structure.

## Result:
Updated TypeScript configuration with proper source directory, build output directory, strict checking, and debugging support. Verified compilation successfully using npx tsc.

---

## Tool:
OpenAI Codex

## Prompt:
Update only backend/package.json.

Change the test script from:
"test": "jest"

to:
"test": "jest --passWithNoTests"

Do not modify any other files.

## Purpose:
Allow Jest setup verification before actual tests exist while maintaining TDD workflow.

## Result:
Updated npm test script so Jest exits successfully when no test files are present during initial project setup.

---

## Tool:
OpenAI Codex

## Prompt:
Update only backend/package.json.

Add the following scripts:

- dev
- build
- start

Keep the existing test script unchanged.

Do not modify any other files.

## Purpose:
Create standard development, build, and production scripts for the backend.

## Result:
Added npm scripts for development with Nodemon, TypeScript compilation, and running the compiled production server.

---

## Tool:
OpenAI Codex

## Prompt:
We are following Test Driven Development (TDD).

Create the first backend test only.

Requirements:
- Create backend/src/tests/app.test.ts
- Use Jest and Supertest
- Test GET /
- Verify HTTP 200
- Verify:
{
  "message": "Car Dealership Inventory API is running"
}

Do not modify any application files.

## Purpose:
Create the first automated backend integration test following the TDD workflow.

## Result:
Created the first Jest + Supertest integration test for the health endpoint. The test was executed successfully using `npm test` on Node.js v24.15.0 and passed, confirming that GET / returns HTTP 200 and the expected JSON response.

---

## Tool:
OpenAI Codex

## Prompt:
We are following strict Test Driven Development (TDD).

Task:
Create a failing integration test for user registration.

Requirements:

1. Create or update:
backend/src/tests/auth/register.test.ts

2. Use Jest and Supertest.

3. Import the existing Express app from src/app.ts.

4. Write one integration test:

POST /api/auth/register

Request body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123!"
}

Expected response:
HTTP 201

{
  "success": true,
  "message": "User registered successfully"
}

Do NOT modify:
- app.ts
- server.ts
- routes
- controllers
- models
- middleware
- package.json

Only create the test file.

The test is expected to FAIL because the endpoint does not exist.

Explain every line after generating the file.

## Purpose:
Create the first failing integration test for the user registration endpoint following the Red phase of the TDD cycle.

## Result:
Created src/tests/auth/register.test.ts containing a Jest and Supertest integration test for POST /api/auth/register. The test failed as expected because the endpoint had not yet been implemented, completing the Red phase of TDD.

---

## Tool:
OpenAI Codex

## Prompt:
We are in the Green phase of Test Driven Development (TDD).

The test for POST /api/auth/register currently fails because the endpoint does not exist.

Implement the minimum code required to make the test pass.

Requirements:

1. Create:
- src/routes/auth.routes.ts

2. Register this router in src/app.ts using:
- /api/auth

3. Add only one route:

POST /register

Return:

HTTP 201

{
  "success": true,
  "message": "User registered successfully"
}

Do NOT:
- Connect MongoDB
- Create models
- Create controllers
- Hash passwords
- Generate JWT
- Add validation
- Add middleware

Keep the implementation as small as possible so only the current test passes.

Explain every file you modify.

## Purpose:
Implement the minimum registration endpoint required to satisfy the failing integration test during the Green phase of TDD.

## Result:
Created src/routes/auth.routes.ts, registered the authentication router in src/app.ts, implemented the POST /api/auth/register endpoint, and verified that both integration tests passed successfully using Jest.

---

## Tool:
OpenAI Codex

## Prompt:
We are continuing the TDD workflow.

The registration endpoint already passes all tests.

Refactor the implementation without changing its behavior.

Requirements:

1. Create:
src/controllers/auth.controller.ts

2. Move the registration logic from the route into a controller function named:

registerUser

3. Update:
src/routes/auth.routes.ts

so that it imports registerUser and uses it for:

POST /register

4. Do NOT change:
- Response body
- Status code
- Route path
- Tests
- app.ts
- package.json

5. The existing Jest tests must continue to pass without modification.

Explain every file you changed.

## Purpose:
Refactor the registration endpoint by separating routing and controller responsibilities while preserving existing behavior and keeping all tests passing.

## Result:
Created `src/controllers/auth.controller.ts`, moved the registration logic into the `registerUser` controller function, updated the authentication route to use the controller, and verified that TypeScript compilation and all Jest tests continued to pass successfully.

---

## Tool:
OpenAI Codex

## Prompt:
We are continuing the TDD workflow.

The registration endpoint already passes all tests.

Refactor the implementation without changing its behavior.

Requirements:

1. Create:
src/controllers/auth.controller.ts

2. Move the registration logic from the route into a controller function named:
registerUser

3. Update:
src/routes/auth.routes.ts

so that it imports registerUser and uses it for:
POST /register

4. Do NOT change:
- Response body
- Status code
- Route path
- Tests
- app.ts
- package.json

5. The existing Jest tests must continue to pass without modification.

Explain every file you changed.

## Purpose:
Refactor the registration endpoint by separating routing and controller responsibilities while preserving existing behavior and keeping all tests passing.

## Result:
Created src/controllers/auth.controller.ts, moved the registration logic into the registerUser controller function, updated the authentication route to use the controller, and verified that TypeScript compilation and all Jest tests continued to pass successfully.

---

## Tool:
OpenAI Codex

## Prompt:
We are in the Green phase of Test Driven Development (TDD).

The integration test for POST /api/auth/register fails because the application does not validate the required name field.

Implement only the minimum code required to make the failing test pass.

Requirements:

1. Update only:
src/controllers/auth.controller.ts

2. Validate the incoming request before returning the success response.

3. If req.body.name is:
- missing
- undefined
- null
- an empty string
- or contains only whitespace

Return:

HTTP 400

{
  "success": false,
  "message": "Name is required"
}

4. Otherwise keep the existing success response exactly the same:

HTTP 201

{
  "success": true,
  "message": "User registered successfully"
}

Do NOT modify:
- routes
- tests
- app.ts
- package.json
- middleware

Do not add email validation.
Do not add password validation.
Implement only the minimum code necessary for the current failing test.

## Purpose:
Implement the minimum validation required for the `name` field so the failing registration integration test passes while preserving existing behavior.

## Result:
Updated `src/controllers/auth.controller.ts` to validate the `name` field, returning HTTP 400 with `"Name is required"` for invalid input and preserving the existing HTTP 201 success response. Verified that all tests passed and the TypeScript build succeeded.

---

## Tool:
OpenAI Codex

## Prompt:
We are in the Green phase of Test Driven Development (TDD).

The integration test for POST /api/auth/register fails because the application does not validate the required email field.

Implement only the minimum code required to make the failing test pass.

Requirements:

- Update only:
  src/controllers/auth.controller.ts

- Before returning the success response, validate the email field.

- If req.body.email is:
  - missing
  - undefined
  - null
  - not a string
  - an empty string
  - or contains only whitespace

Return:

HTTP 400

{
  "success": false,
  "message": "Email is required"
}

Keep the existing name validation unchanged.

Keep the existing success response unchanged.

Do NOT modify:
- routes
- tests
- app.ts
- package.json
- middleware

Do not implement email format validation.
Do not implement password validation.

Implement only the minimum code necessary for the current failing test.

Explain every file you modify.

## Purpose:
Implement the minimum validation required for the email field so the failing registration integration test passes while preserving existing behavior.

## Result:
Updated src/controllers/auth.controller.ts to validate the required email field, returning HTTP 400 with "Email is required" for invalid input while preserving the existing registration success response. Verified that all Jest tests passed and the TypeScript build completed successfully.

---

## Tool:
OpenAI Codex

## Prompt:
We are following strict Test Driven Development (TDD).

Task:
Update the registration integration tests.

Requirements:

Update only:
src/tests/auth/register.test.ts

Add ONE new failing integration test.

Scenario:

POST /api/auth/register

Request Body:

{
  "name": "John Doe",
  "email": "invalid-email",
  "password": "Password123!"
}

Expected Response:

HTTP 400

{
  "success": false,
  "message": "Invalid email format"
}

Keep the existing tests unchanged.

Do NOT modify:
- controllers
- routes
- app.ts
- middleware
- package.json

Only update the test file.

The test must fail because email format validation has not been implemented.

Explain every new line you add.

## Purpose:
Create a failing integration test for invalid email format before implementing validation, following the Red phase of TDD.

## Result:
Added a new integration test covering registration with an invalid email format. Verified that the new test failed as expected because email format validation had not yet been implemented.

---

## Tool:
OpenAI Codex

## Prompt:
We are in the Green phase of Test Driven Development (TDD).

The integration test for POST /api/auth/register fails because the application does not validate the email format.

Implement only the minimum code required to make the failing test pass.

Requirements:

Update only:
src/controllers/auth.controller.ts

Keep the existing name validation unchanged.

Keep the existing email-required validation unchanged.

After confirming that an email exists, validate its format using a simple regular expression.

If the email format is invalid, return:

HTTP 400

{
  "success": false,
  "message": "Invalid email format"
}

Keep the existing success response unchanged.

Do NOT modify:
- routes
- tests
- app.ts
- package.json
- middleware

Do NOT implement:
- password validation
- database logic
- JWT generation

Implement only the minimum code required for the current failing test.

## Purpose:
Implement the minimum email format validation required for the registration endpoint while preserving existing behavior.

## Result:
Updated src/controllers/auth.controller.ts to validate the email format after confirming the email field is present. Invalid email addresses now return HTTP 400 with "Invalid email format". Verified that all Jest tests passed and the TypeScript build completed successfully.

---

## Tool:
OpenAI Codex

## Prompt:
We are following strict Test Driven Development (TDD).

Task:
Add one failing integration test for password required validation.

Requirements:

Update only:

src/tests/auth/register.test.ts

Add ONE new test case.

Scenario:

POST /api/auth/register

Request Body:

{
  "name": "John Doe",
  "email": "john@example.com"
}

The password field is intentionally missing.

Expected Response:

HTTP 400

{
  "success": false,
  "message": "Password is required"
}

Keep all existing tests unchanged.

Do NOT modify:
- controllers
- routes
- app.ts
- middleware
- package.json

Only update the test file.

The test must fail because password validation has not been implemented yet.

Explain every new line added.

## Purpose:
Create a failing integration test for required password validation following the Red phase of TDD.

## Result:
Added a new integration test for missing password validation. Verified that the test failed as expected because password validation was not implemented.

---

## Tool:
OpenAI Codex

## Prompt:
We are in the Green phase of Test Driven Development (TDD).

The integration test for POST /api/auth/register fails because the application does not validate the required password field.

Implement only the minimum code required to make the failing test pass.

Requirements:

Update only:

src/controllers/auth.controller.ts

Keep existing validations unchanged:

- Name required validation
- Email required validation
- Email format validation

Add password required validation.

If password is missing, invalid, or empty, return:

HTTP 400

{
  "success": false,
  "message": "Password is required"
}

Keep the existing success response unchanged.

Do NOT modify:
- routes
- tests
- app.ts
- package.json
- middleware

Do NOT implement:
- password hashing
- JWT
- database logic
- password strength validation

Implement only the minimum code required for the current failing test.

Explain every file you modify.

## Purpose:
Implement the minimum password required validation required to satisfy the failing registration test while preserving existing behavior.

## Result:
Updated src/controllers/auth.controller.ts to validate the password field after existing validations. Missing or invalid passwords now return HTTP 400 with "Password is required". Verified all Jest tests and TypeScript build passed successfully.

---

## Tool:
OpenAI Codex

## Prompt:
We are following strict Test Driven Development (TDD).

Task:
Add one failing integration test for minimum password length validation.

Requirements:

Update only:

src/tests/auth/register.test.ts

Add ONE new test case.

Scenario:

POST /api/auth/register

Request Body:

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123"
}

Expected Response:

HTTP 400

{
  "success": false,
  "message": "Password must be at least 8 characters"
}

Keep all existing tests unchanged.

Do NOT modify:
- controllers
- routes
- app.ts
- middleware
- package.json

Only update the test file.

The test must fail because password length validation has not been implemented yet.

Explain every new line added.

## Purpose:
Create a failing integration test for minimum password length validation following the Red phase of TDD.

## Result:
Added a new integration test for rejecting passwords shorter than 8 characters. Verified that the test failed as expected because minimum password length validation was not implemented.

---

## Tool:
OpenAI Codex

## Prompt:
We are in the Green phase of Test Driven Development (TDD).

The integration test for POST /api/auth/register fails because the application does not validate minimum password length.

Implement only the minimum code required to make the failing test pass.

Requirements:

Update only:

src/controllers/auth.controller.ts

Keep existing validations unchanged:

- Name required validation
- Email required validation
- Email format validation
- Password required validation

After checking that password exists, validate its length.

If password length is less than 8 characters, return:

HTTP 400

{
  "success": false,
  "message": "Password must be at least 8 characters"
}

Keep the existing success response unchanged.

Do NOT modify:
- routes
- tests
- app.ts
- package.json
- middleware

Do NOT implement:
- password hashing
- JWT
- database logic
- password strength rules

Implement only the minimum code required for the current failing test.

Explain every file you modify.

## Purpose:
Implement the minimum password length validation required to satisfy the failing registration test while preserving existing behavior.

## Result:
Updated src/controllers/auth.controller.ts to reject passwords shorter than 8 characters. The endpoint now returns HTTP 400 with the required message while keeping existing registration behavior unchanged. Verified all Jest tests and TypeScript build passed successfully.

---

## Tool:
OpenAI Codex

## Prompt:
We are following strict Test Driven Development (TDD).

Task:
Add one failing integration test for password strength validation.

Requirements:

Update only:

src/tests/auth/register.test.ts

Add ONE new test case.

Scenario:

POST /api/auth/register

Request Body:

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

The password is intentionally weak because it does not contain:
- uppercase letter
- special character

Expected Response:

HTTP 400

{
  "success": false,
  "message": "Password must contain uppercase, lowercase, number and special character"
}

Keep all existing tests unchanged.

Do NOT modify:
- controllers
- routes
- app.ts
- middleware
- package.json

Only update the test file.

The test must fail because password strength validation has not been implemented yet.

Explain every new line added.

## Purpose:
Create a failing integration test for password strength validation following the Red phase of TDD.

## Result:
Added a new integration test for rejecting weak passwords. Verified that the test failed as expected because password strength validation was not implemented.

---

## Tool:
OpenAI Codex

## Prompt:
We are in the Green phase of Test Driven Development (TDD).

The integration test for POST /api/auth/register fails because the application does not validate password strength.

Implement only the minimum code required to make the failing test pass.

Requirements:

Update only:

src/controllers/auth.controller.ts

Keep all existing validations unchanged:

- Name required validation
- Email required validation
- Email format validation
- Password required validation
- Password minimum length validation

Add password strength validation.

The password must contain:
- uppercase letter
- lowercase letter
- number
- special character

If the password does not satisfy these rules, return:

HTTP 400

{
  "success": false,
  "message": "Password must contain uppercase, lowercase, number and special character"
}

Keep the existing success response unchanged.

Do NOT modify:
- routes
- tests
- app.ts
- package.json
- middleware

Do NOT implement:
- password hashing
- JWT
- database logic
- user model

Implement only the minimum code required for the current failing test.

Explain every file you modify.

## Purpose:
Implement the minimum password strength validation required to satisfy the failing registration test while preserving existing behavior.

## Result:
Updated src/controllers/auth.controller.ts to validate password strength requirements. Weak passwords now return HTTP 400 with the required message. Verified all Jest tests and TypeScript build passed successfully.

---

## Tool:
OpenAI Codex

## Prompt:
We are following strict Test Driven Development (TDD).

Task:
Create a failing test for MongoDB database connection setup.

Requirements:

Create:

src/tests/database/database.test.ts

The test should verify database connection behavior without connecting to a real MongoDB instance.

Requirements:

- Import connectDatabase from ../../config/database
- Mock mongoose.connect
- Test the behavior when MONGO_URI is missing

Expected behavior:

When MONGO_URI is missing:

await expect(connectDatabase()).rejects.toThrow(
  'MongoDB connection string is missing'
)

Do NOT modify:
- config/database.ts
- app.ts
- server.ts
- controllers
- routes
- models
- package.json

Only create/update the test file.

The test must fail because database connection logic has not been implemented correctly.

Explain every line added.

## Purpose:
Create an isolated failing database connection test following the Red phase of TDD.

## Result:
Created a database connection test that validates missing MongoDB configuration handling. Verified the test failed before implementation.

---

## Tool:
OpenAI Codex

## Prompt:
We are in the Green phase of Test Driven Development (TDD).

The database connection test fails because connectDatabase() does not properly handle missing MongoDB configuration.

Implement only the minimum code required to make the failing test pass.

Update only:

src/config/database.ts

Requirements:

Export an async function:

connectDatabase()

Behavior:

- Read process.env.MONGO_URI
- If MONGO_URI is missing, throw:
  "MongoDB connection string is missing"
- If MONGO_URI exists, connect using mongoose.connect()

Do NOT modify:
- tests
- app.ts
- server.ts
- controllers
- routes
- models
- package.json

Do NOT add:
- retry logic
- logging
- models
- extra database features

Keep implementation minimal.

Explain every file modified.

## Purpose:
Implement the minimum database connection function required to satisfy the failing test during the Green phase of TDD.

## Result:
Created src/config/database.ts with connectDatabase(). Added MongoDB URI validation and mongoose connection handling. Verified Jest tests and TypeScript build passed successfully.

---

## Tool:
OpenAI Codex

## Prompt:
We are following strict Test Driven Development (TDD).

Task:
Create a failing test for the User model structure.

Requirements:

Create:

src/tests/models/user.test.ts

The test should verify that the User model exists and contains required fields.

Required fields:

- name
- email
- password

Requirements:

- Import User from ../../models/user.model
- Verify the model exists
- Verify the schema contains:
  name
  email
  password

Do NOT create the model implementation yet.

Do NOT modify:
- controllers
- routes
- app.ts
- server.ts
- database configuration
- package.json

Only create the test file.

The test must fail because the User model does not exist.

Explain every line added.

## Purpose:
Create the failing User model test following the Red phase of TDD.

## Result:
Created a User model test that verifies the required schema fields. Confirmed the test failed before implementing the model.

---

## Tool:
OpenAI Codex

## Prompt:
We are in the Green phase of Test Driven Development (TDD).

The User model test fails because the User model does not exist.

Implement only the minimum code required to make the failing test pass.

Create:

src/models/user.model.ts

Requirements:

Create a Mongoose User model.

Schema fields:

- name: String, required
- email: String, required, unique
- password: String, required

Requirements:

- Import mongoose
- Create UserSchema
- Export User model as default

Do NOT modify:
- tests
- controllers
- routes
- app.ts
- server.ts
- database configuration
- package.json

Do NOT add:
- password hashing
- JWT
- middleware
- hooks
- timestamps
- extra fields

Keep implementation minimal.

Explain every file modified.

## Purpose:
Implement the minimum User model required to satisfy the failing model test during the Green phase of TDD.

## Result:
Created src/models/user.model.ts with the required Mongoose schema fields. Verified Jest tests and TypeScript build passed successfully.

---

## Tool:
OpenAI Codex

## Prompt:
We are following strict Test Driven Development (TDD).

Task:
Create a failing integration test to verify that registration creates a user.

Requirements:

Update only:

src/tests/auth/register.test.ts

Add ONE new test case.

Scenario:

POST /api/auth/register

Request:

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123!"
}

Expected response:

HTTP 201

{
  "success": true,
  "message": "User registered successfully"
}

Additionally verify:

- User.create() is called
- It receives:
  name
  email
  password

Requirements:

- Mock the User model operation
- Do not connect to real MongoDB

Keep existing tests unchanged.

Do NOT modify:
- controllers
- routes
- models
- app.ts
- database configuration
- package.json

Only update the test file.

The test must fail because registration does not create users yet.

Explain every line added.

## Purpose:
Create the failing user creation integration test following the Red phase of TDD.

## Result:
Added a test verifying that registration creates a user through User.create(). Confirmed the test failed before implementing database creation logic.

---

## Tool:
OpenAI Codex

## Prompt:
We are in the Green phase of Test Driven Development (TDD).

The user creation test fails because the registration controller does not create users.

Implement only the minimum code required to make the failing test pass.

Update only:

src/controllers/auth.controller.ts

Requirements:

Import User model from:

../models/user.model

After validations pass, create a user using:

User.create({
  name,
  email,
  password
})

Use values from req.body.

Keep existing validations unchanged.

Keep existing response unchanged:

HTTP 201

{
  "success": true,
  "message": "User registered successfully"
}

Do NOT add:
- password hashing
- JWT
- login logic
- middleware
- extra validation

Do NOT modify:
- tests
- routes
- models
- app.ts
- server.ts
- database configuration
- package.json

Keep implementation minimal.

Explain every file modified.

## Purpose:
Implement the minimum user creation logic required during the Green phase of TDD.

## Result:
Updated auth.controller.ts to create users through User.create(). Verified all tests and TypeScript build passed successfully.

---

## Tool:
OpenAI Codex

## Prompt:
We are following strict Test Driven Development (TDD).

Task:
Create a failing integration test to verify password hashing during registration.

Requirements:

Update:

src/tests/auth/register.test.ts

Add a test that verifies:

- User.create() is called
- Password passed to User.create() is not equal to the original password
- Password is stored as a hashed value

The test should use mocked User.create().
Do not connect to real MongoDB.

The test must fail because password hashing has not been implemented.

Do not modify:
- controllers
- models
- routes
- app.ts
- database configuration
- package.json

## Purpose:
Create the failing password hashing test following the Red phase of TDD.

## Result:
Created a password hashing test and confirmed it failed because registration stored the raw password.

---

## Tool:
OpenAI Codex

## Prompt:
We are in the Green phase of Test Driven Development (TDD).

Implement password hashing during registration.

Update only:

src/controllers/auth.controller.ts

Requirements:

- Import bcryptjs
- Hash password using bcrypt.hash(password, 10)
- Pass hashed password to User.create()

Keep all existing validations unchanged.

Do not add:
- JWT
- login logic
- middleware
- extra validation

Do not modify:
- tests
- routes
- models
- app.ts
- database configuration
- package.json

## Purpose:
Implement minimum password hashing required during the Green phase of TDD.

## Result:
Added bcrypt password hashing before user creation. Verified tests and TypeScript build passed.

---

## Tool:
OpenAI Codex

## Prompt:
Update the existing registration test to match the new password hashing behavior.

Requirements:

Update only:

src/tests/auth/register.test.ts

Change the user creation expectation.

Do not expect plain password anymore.

Verify:

- User.create() receives a string password
- Password passed is different from original password

Keep test purpose unchanged.

Do not modify application code.

## Purpose:
Keep tests aligned with the updated password hashing behavior.

## Result:
Updated registration test expectations. All tests passed successfully.

---

## Tool:
OpenAI Codex

## Prompt:
We are following strict Test Driven Development (TDD).

Task:
Create a failing integration test for user login.

Requirements:

Create:

src/tests/auth/login.test.ts

Test endpoint:

POST /api/auth/login

Scenario:

Existing user:

{
  name: "John Doe",
  email: "john@example.com",
  password: "hashedPassword"
}

Request:

{
  email: "john@example.com",
  password: "Password123!"
}

Mock:

- User.findOne()
- bcrypt.compare()

Expected response:

HTTP 200

{
  success: true,
  token: expect.any(String)
}

Do not connect to real MongoDB.

Do not modify application files.

## Purpose:
Create the failing login test following the Red phase of TDD.

## Result:
Created login integration test and confirmed failure because login functionality was not implemented.

---

## Tool:
OpenAI Codex

## Prompt:
We are in the Green phase of Test Driven Development (TDD).

Implement the minimum login functionality required.

Requirements:

Add POST /login.

Implement loginUser controller.

Steps:

- Find user by email
- Compare password using bcrypt.compare()
- Generate JWT token
- Return success response with token

Response:

HTTP 200

{
 success: true,
 token: token
}

Do not add extra authentication features.

Do not modify tests.

## Purpose:
Implement minimum login functionality during Green phase of TDD.

## Result:
Implemented login endpoint with password comparison and JWT generation. Verified tests and TypeScript build passed successfully.

---

## Tool:
OpenAI Codex

## Prompt:
We are following strict Test Driven Development (TDD).

Task:
Create a failing test for JWT authentication middleware.

Requirements:

Create:

src/tests/middleware/auth.middleware.test.ts

The test should verify that requests without a valid JWT token are rejected.

Scenario:

GET /api/protected

Without Authorization header.

Expected response:

HTTP 401

{
 success: false,
 message: "Not authorized"
}

Requirements:

- Do not create middleware implementation.
- Do not modify application files.
- Do not connect database.

Only create the failing test.

## Purpose:
Create the failing authentication middleware test following the Red phase of TDD.

## Result:
Created middleware test and confirmed failure because authentication middleware did not exist.

---

## Tool:
OpenAI Codex

## Prompt:
We are in the Green phase of Test Driven Development (TDD).

Implement the minimum JWT authentication middleware.

Create:

src/middleware/auth.middleware.ts

Requirements:

- Read Authorization header.
- Expect Bearer token format.
- Verify token using jsonwebtoken.
- Return 401 when token is missing.
- Call next() when token is valid.

Do not add:
- roles
- permissions
- refresh tokens
- extra authorization logic

## Purpose:
Implement minimum JWT middleware required during Green phase.

## Result:
Created JWT authentication middleware. Verified tests and TypeScript build passed successfully.

---

## Tool:
OpenAI Codex

## Prompt:
We are following strict Test Driven Development (TDD).

Task:
Create a failing test for the authenticated user profile endpoint.

Requirements:

Create:

src/tests/users/profile.test.ts

Test:

GET /api/users/me

Mock:

- Authentication middleware
- User.findById()

Do not implement the route or controller yet.

## Purpose:
Create the failing user profile test following the Red phase of TDD.

## Result:
Created src/tests/users/profile.test.ts, mocked authentication middleware and User.findById(), and confirmed the test failed before implementation.

---

## Tool:
OpenAI Codex

## Prompt:
We are in the Green phase of Test Driven Development (TDD).

Implement the minimum authenticated user profile endpoint.

Requirements:

- Create src/controllers/user.controller.ts
- Create src/routes/user.routes.ts
- Add GET /api/users/me
- Connect the route in app.ts
- Return authenticated user data

## Purpose:
Implement the minimum user profile endpoint required during the Green phase of TDD.

## Result:
Created user.controller.ts and user.routes.ts, added GET /api/users/me, connected it in app.ts, returned authenticated user data, and verified tests and TypeScript build passed.

---

## Tool:
OpenAI Codex

## Prompt:
We are following strict Test Driven Development (TDD).

Task:
Create a failing test for the Car model structure.

Requirements:

Create:

src/tests/models/car.test.ts

The test should verify that the Car model exists and contains required fields.

Required fields:

- brand
- model
- year
- price
- mileage
- status

Requirements:

- Import Car model from ../../models/car.model
- Verify the model exists.
- Verify the schema contains all required fields.

Do NOT create the model implementation yet.

Do NOT modify:

- controllers
- routes
- app.ts
- server.ts
- database configuration
- package.json
- existing models

Only create the test file.

The test must fail because Car model does not exist.

Explain every line added.

## Purpose:
Create the failing Car model test following the Red phase of TDD.

## Result:
Created car model test and verified failure because the Car model implementation did not exist.

---

## Tool:
OpenAI Codex

## Prompt:
We are in the Green phase of Test Driven Development (TDD).

The Car model test fails because the Car model does not exist.

Implement only the minimum code required to make the test pass.

Create:

src/models/car.model.ts

Requirements:

Create a Mongoose Car model.

Schema fields:

- brand: String, required
- model: String, required
- year: Number, required
- price: Number, required
- mileage: Number, required
- status: String, required

Requirements:

- Import mongoose.
- Create CarSchema.
- Export Car model as default.

Keep implementation minimal.

Do NOT add:

- image upload
- owner/dealer relation
- search functionality
- extra fields
- timestamps

Do NOT modify:

- tests
- controllers
- routes
- app.ts
- database configuration
- package.json

Explain every file modified.

## Purpose:
Create the minimum Car model required during the Green phase of TDD.

## Result:
Created car.model.ts with the required Mongoose schema fields. Verified all tests and TypeScript build passed successfully.

---

## Tool:
OpenAI Codex

## Prompt:
We are following strict Test Driven Development (TDD).

Task:
Create a failing integration test for creating a car.

Create:

src/tests/cars/create-car.test.ts

Test endpoint:

POST /api/cars

Request body:

{
 brand: "Toyota",
 model: "Camry",
 year: 2024,
 price: 2500000,
 mileage: 15,
 status: "available"
}

Requirements:

- Use Jest and Supertest.
- Mock Car.create().
- Mock authentication middleware.
- Verify Car.create() is called with provided car details.

Expected response:

HTTP 201

{
 success: true,
 car: expect.any(Object)
}

Do not implement controller or route.

Do not modify application files.

## Purpose:
Create the failing car creation test following the Red phase of TDD.

## Result:
Created create-car.test.ts and confirmed failure because POST /api/cars was not implemented.

---

## Tool:
OpenAI Codex

## Prompt:
We are in the Green phase of Test Driven Development (TDD).

Implement the minimum Create Car API required.

Create:

src/controllers/car.controller.ts

Create:

src/routes/car.routes.ts

Requirements:

- Add POST /api/cars endpoint.
- Read car details from request body.
- Use Car.create().
- Return HTTP 201 response with created car.
- Protect route using existing authentication middleware.
- Register /api/cars route in app.ts.

Do not add extra features.

## Purpose:
Implement the minimum Create Car API during the Green phase of TDD.

## Result:
Added car controller and route for creating cars. Connected authentication middleware and verified tests and build passed successfully.

---

## Tool:
OpenAI Codex

## Prompt:
We are following strict Test Driven Development (TDD).

Task:
Create a failing integration test for retrieving all cars.

Create:

src/tests/cars/get-cars.test.ts

Test endpoint:

GET /api/cars

Requirements:

- Use Jest and Supertest.
- Mock authentication middleware.
- Mock Car.find().

Mock response data should contain a sample car object.

Expected response:

HTTP 200

{
 success: true,
 cars: expect.any(Array)
}

Verify:

- Car.find() is called.
- Returned cars are included in response.

Do not implement controller or route.

Do not modify application files.

## Purpose:
Create the failing get cars test following the Red phase of TDD.

## Result:
Created get-cars.test.ts and confirmed failure because GET /api/cars was not implemented.

---

## Tool:
OpenAI Codex

## Prompt:
We are in the Green phase of Test Driven Development (TDD).

Implement the minimum Get All Cars API.

Requirements:

- Add GET /api/cars endpoint.
- Use Car.find() to retrieve cars.
- Return success response with cars array.
- Protect route using existing authentication middleware.
- Register route in app.ts if required.

Do not add:
- pagination
- search
- filtering
- sorting

## Purpose:
Implement the minimum Get All Cars API during the Green phase of TDD.

## Result:
Added GET /api/cars endpoint using Car.find(). Protected the route and verified tests and TypeScript build passed successfully.

---

## Tool:
OpenAI Codex

## Prompt:
We are following strict Test Driven Development (TDD).

Task:
Create a failing integration test for updating a car by id.

Create:

src/tests/cars/update-car.test.ts

Test endpoint:

PUT /api/cars/:id

Requirements:

- Use Jest and Supertest.
- Mock authentication middleware.
- Mock Car.findByIdAndUpdate().

Request body:

{
 price: 2700000,
 status: "sold"
}

Verify:

- Car.findByIdAndUpdate() is called with the provided id and update data.
- Updated car is returned.

Expected response:

HTTP 200

{
 success: true,
 car: expect.any(Object)
}

Do not implement controller or route.

Do not modify application files.

## Purpose:
Create the failing update car test following the Red phase of TDD.

## Result:
Created update-car.test.ts and confirmed failure because PUT /api/cars/:id was not implemented.

---

## Tool:
OpenAI Codex

## Prompt:
We are in the Green phase of Test Driven Development (TDD).

Implement the minimum Update Car API.

Requirements:

- Add PUT /api/cars/:id endpoint.
- Use Car.findByIdAndUpdate().
- Return updated car.
- Return 404 when car is not found.
- Protect route using existing authentication middleware.

Do not add extra features.

## Purpose:
Implement the minimum Update Car API during the Green phase of TDD.

## Result:
Added PUT /api/cars/:id endpoint with update logic and not-found handling. Verified tests and TypeScript build passed successfully.

---

## Tool:
OpenAI Codex

## Prompt:
We are following strict Test Driven Development (TDD).

Task:
Create a failing integration test for deleting a car by id.

Create:

src/tests/cars/delete-car.test.ts

Test endpoint:

DELETE /api/cars/:id

Requirements:

- Use Jest and Supertest.
- Mock authentication middleware.
- Mock Car.findByIdAndDelete().

Verify:

- Car.findByIdAndDelete() is called with provided id.
- Successful deletion returns correct response.

Expected response:

HTTP 200

{
 success: true,
 message: "Car deleted successfully"
}

Do not implement controller or route.

Do not modify application files.

## Purpose:
Create the failing delete car test following the Red phase of TDD.

## Result:
Created delete-car.test.ts and confirmed failure because DELETE /api/cars/:id was not implemented.

---

## Tool:
OpenAI Codex

## Prompt:
We are in the Green phase of Test Driven Development (TDD).

Implement the minimum Delete Car API.

Requirements:

- Add DELETE /api/cars/:id endpoint.
- Use Car.findByIdAndDelete().
- Return success message after deletion.
- Return 404 when car is not found.
- Protect route using existing authentication middleware.

Do not add extra features.

## Purpose:
Implement the minimum Delete Car API during the Green phase of TDD.

## Result:
Added DELETE /api/cars/:id endpoint with delete logic and not-found handling. Verified tests and TypeScript build passed successfully.

---

## Tool:
OpenAI Codex

## Prompt:
We are following strict Test Driven Development (TDD).

Task:
Create a failing integration test for searching and filtering cars.

Create:

src/tests/cars/search-cars.test.ts

Test endpoint:

GET /api/cars?brand=Toyota&status=available

Requirements:

- Use Jest and Supertest.
- Mock authentication middleware.
- Mock Car.find().

Verify:

- Car.find() is called with the provided filter conditions.
- Returned filtered cars are included in response.

Expected response:

HTTP 200

{
 success: true,
 cars: expect.any(Array)
}

Do not implement filtering logic.

Do not modify application files.

## Purpose:
Create the failing search/filter test following the Red phase of TDD.

## Result:
Created search-cars.test.ts and confirmed failure because filtering logic was not implemented.

---

## Tool:
OpenAI Codex

## Prompt:
We are in the Green phase of Test Driven Development (TDD).

Implement the minimum car search/filter functionality.

Requirements:

- Update GET /api/cars controller.
- Read brand and status query parameters.
- Create dynamic filter object.
- Use Car.find(filter).
- Return filtered cars.

Do not add:
- pagination
- sorting
- advanced search

## Purpose:
Implement minimum search/filter functionality during the Green phase of TDD.

## Result:
Added query-based filtering using Car.find(). Verified tests and TypeScript build passed successfully.

---

## Tool:
OpenAI Codex

## Prompt:
We are following strict Test Driven Development (TDD).

Task:
Create a failing integration test for paginated car listing.

Create:

src/tests/cars/pagination.test.ts

Test endpoint:

GET /api/cars?page=1&limit=10

Requirements:

- Use Jest and Supertest.
- Mock authentication middleware.
- Mock Car.find().
- Mock Car.countDocuments().

Verify:
- Pagination methods are used.
- Total count is retrieved.
- Response contains cars, page, limit, and total.

Do not implement pagination logic.

## Purpose:
Create the failing pagination test following the Red phase of TDD.

## Result:
Created pagination.test.ts and confirmed failure because pagination functionality was not implemented.

---

## Tool:
OpenAI Codex

## Prompt:
We are in the Green phase of Test Driven Development (TDD).

Implement minimum pagination functionality.

Requirements:

- Read page and limit query parameters.
- Calculate skip value.
- Use Car.find().skip().limit().
- Use Car.countDocuments().
- Return paginated response.
- Maintain existing brand and status filters.

Do not add sorting or advanced query features.

## Purpose:
Implement pagination during the Green phase of TDD.

## Result:
Added pagination support using skip, limit, and countDocuments.

---

## Tool:
OpenAI Codex

## Prompt:
Fix regression caused by pagination implementation.

Requirements:

- Keep old GET /api/cars response working without pagination parameters.
- Return pagination metadata only when page or limit is provided.
- Maintain existing filtering functionality.

Do not modify tests.

## Purpose:
Restore backward compatibility after adding pagination.

## Result:
Fixed GET /api/cars regression. Verified all tests and build passed successfully.

---

## Tool:
OpenAI Codex

## Prompt:
We are following strict Test Driven Development (TDD).

Task:
Create a failing test for global error handling middleware.

Create:

src/tests/middleware/error.middleware.test.ts

Requirements:

- Use Jest and Supertest.
- Create a test route that throws an error.
- Verify centralized error response.

Expected response:

HTTP 500

{
 success: false,
 message: "Test error"
}

Do not implement error middleware.

## Purpose:
Create the failing error middleware test following the Red phase of TDD.

## Result:
Created error middleware test and confirmed failure because global error handling was not implemented.

---

## Tool:
OpenAI Codex

## Prompt:
We are in the Green phase of Test Driven Development (TDD).

Implement minimum global error handling.

Requirements:

- Create error.middleware.ts.
- Handle Express errors.
- Return standardized JSON response.
- Register middleware after routes in app.ts.

Do not add logging or external services.

## Purpose:
Implement centralized error handling during the Green phase of TDD.

## Result:
Added global error middleware and standardized error responses.

---

## Tool:
OpenAI Codex

## Prompt:
Fix regression in global error handling.

Requirements:

- Ensure Express uses custom error middleware.
- Ensure middleware order is correct.
- Ensure error responses are returned using res.status().json().

Do not modify tests.

## Purpose:
Fix middleware registration issue while maintaining TDD behavior.

## Result:
Fixed error middleware registration and verified all tests and build passed successfully.

---

## Tool:
OpenAI Codex

## Prompt:
We are following strict Test Driven Development (TDD).

Task:
Create a failing test for Swagger API documentation setup.

Create:

src/tests/docs/swagger.test.ts

Requirements:

- Use Jest and Supertest.
- Test GET /api-docs/ endpoint.
- Verify Swagger UI documentation route exists.
- Expect successful HTML response.

Do not implement Swagger setup.

## Purpose:
Create the failing Swagger documentation test following the Red phase of TDD.

## Result:
Created swagger.test.ts and confirmed failure because Swagger documentation was not configured.

---

## Tool:
OpenAI Codex

## Prompt:
We are in the Green phase of Test Driven Development (TDD).

Implement minimum Swagger documentation setup.

Requirements:

- Install swagger-ui-express and swagger-jsdoc.
- Create Swagger configuration.
- Add /api-docs route in app.ts.
- Configure basic API title and version.

Do not add endpoint documentation yet.

## Purpose:
Implement Swagger API documentation during the Green phase of TDD.

## Result:
Added Swagger configuration and API documentation endpoint. Verified tests and TypeScript build passed successfully.

---

## Tool:
OpenAI Codex

## Prompt:
Review the existing README.md.

Analyze the existing project before making changes.

Create a professional GitHub README that accurately reflects the implemented project.

Requirements:

- Preserve technical accuracy.
- Document only implemented features.
- Add a project overview.
- Add project structure.
- Add getting started instructions.
- Add environment variables.
- Add API endpoints table.
- Add testing information.
- Add future improvements.
- Improve formatting with badges and a table of contents.
- Do not invent features.
- Do not modify application source code.

## Purpose:
Create a professional GitHub README that accurately documents the project and improves repository presentation.

## Result:
Updated README.md with professional project documentation, badges, table of contents, setup instructions, API reference, testing information, and improved formatting while preserving technical accuracy.

---

## Tool:
OpenAI Codex

## Prompt:
Analyze the existing backend configuration.

Create a new `.env.example` file containing every environment variable required by the application.

Requirements:

- Include all required environment variables.
- Use placeholder values only.
- Do not expose secrets.
- Match the application's existing configuration.
- Do not modify source code.

## Purpose:
Provide a template environment configuration so developers can quickly create their own `.env` file after cloning the repository.

## Result:
Created `.env.example` with placeholder values for all required environment variables while keeping sensitive information out of version control.

---

## Tool:
OpenAI Codex

## Prompt:
Implement frontend routing foundation for the Car Dealership Inventory System.

Include:
- React Router setup
- Configured routes:
  - /
  - /login
  - /register
  - /cars
  - /add-car
- Added shared layout with Navbar
- Connected existing page components
- Added Home page placeholder
- Verified frontend production build

## Purpose:
Create the basic frontend navigation structure and connect application pages before implementing business logic.

## Result:
Implemented React Router based navigation with shared Navbar layout. Connected all required pages and verified that the frontend production build completed successfully.

## Tool:
OpenAI Codex

## Prompt:
We are continuing development of the Car Dealership Inventory System.

Follow the existing project architecture and do not modify backend files.

Task:
Create the frontend authentication foundation.

Requirements:

1. Update frontend/src/services/api.ts

Create a reusable Axios API client.

Requirements:
- Use axios.create()
- Set backend base URL using environment variable:
  VITE_API_URL
- Add default JSON headers.

2. Update frontend/src/context/AuthContext.tsx

Implement authentication state management.

Requirements:
- Store current user state.
- Store authentication token state.
- Provide login and logout functions.
- Persist token using localStorage.
- Create AuthContext provider.

3. Do not implement:
- Login form UI
- Register form UI
- JWT decoding
- Protected routes
- Advanced authentication features

4. Keep implementation minimal and production-friendly.

5. Verify:
- TypeScript compilation
- Frontend production build

Do not modify:
- backend files
- routing structure
- page components

Explain every file modified.

## Purpose:
Create the frontend authentication foundation before implementing login and registration UI.

## Result:
Implemented Axios API service and authentication context with token persistence, login/logout handling, and reusable authentication state management. Verified frontend TypeScript compilation and production build successfully.

---

## Tool:
OpenAI Codex

## Prompt:
We are continuing development of the Car Dealership Inventory System frontend.

Task:
Implement basic Login and Register functionality.

Include:
- Login form with email and password
- Register form with name, email and password
- API integration using existing Axios service
- Authentication state update using AuthContext
- Loading and error handling
- AuthProvider integration in main.tsx

Do not include:
- JWT decoding
- Protected routes
- Role-based access
- Advanced validation

## Purpose:
Connect frontend authentication pages with backend authentication APIs while keeping the implementation minimal.

## Result:
Implemented Login and Register flows using Axios and AuthContext. Added authentication provider integration and verified frontend production build successfully.

---

## Tool:
OpenAI Codex

## Prompt:
Improve the Login and Register UI while preserving existing functionality.

Requirements:
- Update only frontend UI files.
- Create modern responsive authentication forms.
- Improve labels, placeholders, spacing, and accessibility.
- Add loading states.
- Add error and success feedback styling.
- Maintain existing API calls.
- Do not modify backend, routing, AuthContext, or authentication logic.
- Verify frontend production build.

## Purpose:
Improve frontend authentication page presentation before implementing further product features.

## Result:
Updated Login and Register pages with a professional responsive dealer portal UI. Added improved form styling, loading states, error handling presentation, and registration success feedback. Verified frontend production build completed successfully.

---

## Tool:
OpenAI Codex

## Prompt:
We are continuing the frontend implementation of the Car Dealership Inventory System.

Task:
Separate the car retrieval API logic from the Cars page while preserving the existing UI and behavior.

Requirements:

- Create a reusable getCars() helper in frontend/src/services/api.ts.
- Replace the direct API request inside Cars.tsx with getCars().
- Preserve loading state, error handling, UI, and TypeScript types.
- Do not modify routing, AuthContext, backend, or styles.
- Verify the frontend production build.

## Purpose:
Refactor frontend data access by separating API communication from UI components, improving maintainability and enabling future reuse.

## Result:
Created a reusable getCars() API helper and updated Cars.tsx to consume it. Preserved existing behavior while improving separation of concerns. Verified that the frontend production build completed successfully.

---

## Tool:
OpenAI Codex

## Prompt:
We are continuing the frontend implementation of the Car Dealership Inventory System.

Task:
Implement the Add Car page and connect it to the existing backend Create Car API.

Requirements:

- Create a responsive Add Car form.
- Include fields:
  - Brand
  - Model
  - Year
  - Price
  - Mileage
  - Status
- Use React useState for form state.
- Validate that every field is completed before submission.
- Display inline validation errors.
- Show loading while submitting.
- Create a reusable createCar() helper inside frontend/src/services/api.ts.
- Submit data to POST /api/cars using the authentication token.
- Display backend errors when available.
- Show a success message and redirect to /cars after successful creation.
- Do not modify backend or routing.
- Verify the frontend production build.

## Purpose:
Implement the frontend Create Car workflow while keeping API communication reusable and separating UI from networking logic.

## Result:
Implemented a responsive Add Car form with client-side validation, loading and error handling, reusable createCar() API helper, authenticated POST integration, success feedback, and automatic navigation to the inventory page. Verified that the frontend production build completed successfully.

---

## Tool:
OpenAI Codex

## Prompt:
We are continuing the frontend implementation of the Car Dealership Inventory System.

Task:
Implement the Edit Car feature using the existing backend.

Requirements:

- Create EditCar.tsx.
- Add protected route:
  - /cars/:id/edit
- Add reusable API helpers:
  - getCarById()
  - updateCar()
- Load the existing vehicle using the route id.
- Pre-populate the form.
- Reuse the Add Car validation and UI style.
- Display loading while fetching.
- Display backend errors.
- Update the vehicle using the backend API.
- Show success feedback.
- Redirect to /cars after success.
- Do not modify backend or authentication architecture.
- Verify the frontend production build.

## Purpose:
Implement the Update operation of the CRUD workflow while keeping networking logic reusable and maintaining separation between UI and API communication.

## Result:
Implemented Edit Car with authenticated data loading, reusable API helpers, pre-filled form fields, validation, loading and error handling, successful update flow, protected routing, and automatic navigation back to the inventory. Verified that the frontend production build completed successfully.

## Tool:
OpenAI Codex

## Prompt:
Implement inventory management on the Cars page.

Include:
- Edit button on every car card
- Delete button with confirmation dialog
- Reusable deleteCar() API helper
- Optimistic UI update after deletion
- Per-card loading state
- Success and API error feedback
- Preserve existing search functionality
- Verified frontend production build

## Purpose:
Allow authenticated users to edit and delete dealership inventory efficiently without reloading the page.

## Result:
Added edit and delete actions to inventory cards, implemented a reusable authenticated delete API helper, confirmed deletions before removal, updated the UI immediately after successful deletion, displayed loading and feedback states, and verified the frontend production build.

## Tool:
OpenAI Codex

## Prompt:
Refactor the inventory page by extracting a reusable CarCard component.

Include:
- Create reusable CarCard component
- Strongly typed props
- Move existing vehicle card UI into CarCard
- Render:
  - Brand
  - Model
  - Year
  - Price
  - Mileage
  - Status
  - Edit button
  - Delete button
- Keep delete state support
- Update Cars.tsx to render CarCard components
- Preserve search, routing, authentication, styling, and API behavior
- Verify frontend production build

## Purpose:
Improve frontend architecture by separating presentation from page logic, making the inventory easier to maintain and extend.

## Result:
Extracted a reusable CarCard component while keeping all existing functionality unchanged. Cars.tsx now focuses on inventory state management, searching, filtering, and delete operations, resulting in cleaner and more maintainable React code.

## Tool:
OpenAI Codex

## Prompt:
Implement a professional Dashboard (Home) page for the Car Dealership Inventory System.

Include:
- Dealer Dashboard welcome section
- Quick Action cards:
  - Add Vehicle
  - View Inventory
- Inventory statistics:
  - Total Cars
  - Available Cars
  - Sold Cars
  - Average Price
- Fetch inventory using the existing API helper
- Compute statistics on the frontend
- Responsive dashboard layout
- Loading skeleton placeholders
- Error state
- Keep existing authentication, routing, backend, and API endpoints unchanged
- Verify frontend production build

## Purpose:
Replace the placeholder home page with a professional dealership dashboard that provides inventory insights and quick navigation, improving usability and making the application resemble a real production admin panel.

## Result:
Implemented a responsive dashboard featuring quick action cards, live inventory statistics calculated from existing API data, loading placeholders, and error handling while preserving the existing application architecture.

---

## Tool:
OpenAI Codex

## Prompt:
Refactor the frontend by introducing reusable UI components without changing application behavior.

Include:
- Create reusable UI components:
  - Button
  - Card
  - Spinner
  - EmptyState
- Use the new components in:
  - Home page
  - Cars page
- Preserve all existing business logic, API calls, authentication, routing, and styling behavior.
- Reduce duplicated JSX and improve maintainability.
- Verify frontend production build.

## Purpose:
Introduce a reusable UI component library to improve code organization, consistency, and maintainability while keeping the application's behavior unchanged.

## Result:
Created reusable Button, Card, Spinner, and EmptyState components and refactored the Home and Cars pages to use them without changing functionality. Verified that the frontend production build completed successfully.

## Tool:
OpenAI Codex

## Prompt:
Implement a reusable toast notification system.

Include:
- Toast component
- ToastProvider using Context API
- success(), error(), info() helpers
- Auto-dismiss notifications
- Stacked toast support
- CSS animations
- Replace success messages in Login, Register, AddCar, EditCar, and Cars
- Preserve existing error handling
- Verify frontend production build.

## Purpose:
Improve user experience by introducing reusable global toast notifications for application feedback while keeping business logic unchanged.

## Result:
Implemented a reusable toast notification system with stacked animated notifications, integrated globally through Context API, and replaced page-level success messages across the application.

## Tool:
OpenAI Codex

## Prompt:

Implement a reusable StatusBadge component for the Car Dealership Inventory System frontend.

Requirements:
- Created reusable StatusBadge component
- Supports available, sold, reserved
- Gray fallback for unknown statuses
- Integrated StatusBadge into CarTable
- Preserved all existing functionality
- Verified production build

## Purpose:

Create the first reusable status presentation component to standardize vehicle status styling and establish a scalable UI component pattern.

## Result:

Implemented reusable StatusBadge, replaced plain status text inside CarTable, preserved existing behavior, and verified the frontend production build completed successfully.

---

## Tool:
OpenAI Codex

## Prompt:

Implement reusable client-side table sorting for the inventory table.

Requirements:
- Added client-side sorting
- Default sort: Brand ascending
- Sortable columns:
  - Brand
  - Year
  - Price
  - Mileage
- Toggle ascending/descending sorting
- Added reusable SortableHeader component inside CarTable
- Added visual sort indicators (▲ ▼ ↕)
- Kept CarTable presentational
- Managed sorting state in Cars.tsx
- Preserved search, delete, edit, StatusBadge, and existing functionality
- Verified frontend production build

## Purpose:

Improve the inventory table with reusable client-side sorting while keeping business logic inside Cars.tsx and presentation inside CarTable.

## Result:

Implemented reusable table sorting with sortable headers, visual sort indicators, preserved all existing inventory functionality, and verified the frontend production build completed successfully.

---

## Tool:
OpenAI Codex

## Prompt:

Implement a reusable inventory summary component.

Requirements:
- Create a reusable InventorySummary component
- Display:
  - Total vehicles
  - Filtered vehicles
  - Current search term
  - Current sort field
  - Current sort direction
- Use the existing reusable Card component
- Responsive layout for desktop and mobile
- Integrate InventorySummary above the inventory table
- Keep CarTable presentational
- Preserve search, sorting, delete, edit, StatusBadge, toast notifications, and existing functionality
- Verify frontend production build

## Purpose:

Provide users with a clear overview of the current inventory state while keeping summary logic separate from the table and improving dashboard usability.

## Result:

Implemented a reusable InventorySummary component displaying inventory totals, filtered results, search term, and current sorting information. Integrated it into the Cars page, preserved all existing functionality, and verified the frontend production build completed successfully.

---

## Tool:
OpenAI Codex

## Prompt:

Implement reusable client-side pagination for the inventory table.

Requirements:
- Create reusable Pagination component
- Previous and Next navigation
- Numbered page buttons
- Highlight current page
- Disable Previous on first page
- Disable Next on last page
- Keyboard accessible controls
- Responsive desktop/mobile layout
- Keep Pagination reusable
- Manage pagination state inside Cars.tsx
- Default page = 1
- Display 8 vehicles per page
- Apply pagination after search filtering and sorting
- Reset to page 1 whenever search changes
- Keep current page after sorting whenever possible
- Automatically correct invalid page numbers after filtering
- Update InventorySummary to display:
  - Showing X–Y of Z vehicles
- Keep CarTable presentational
- Preserve search, sorting, edit, delete, StatusBadge, toast notifications, loading state, and responsive behavior
- Verify frontend production build

## Purpose:

Improve the inventory experience with reusable client-side pagination while maintaining clean separation between business logic and presentation.

## Result:

Implemented a reusable Pagination component with accessible navigation, integrated client-side pagination into Cars.tsx, updated InventorySummary with paginated result counts, preserved all existing inventory functionality, and verified the frontend production build completed successfully.

---

## Tool:
OpenAI Codex

## Prompt:

Implement reusable inventory status filtering.

Requirements:
- Create reusable StatusFilter component
- Render a styled dropdown
- Supported options:
  - All
  - Available
  - Reserved
  - Sold
- Keep StatusFilter completely presentational
- Manage filter state inside Cars.tsx
- Default filter = All
- Apply filtering order:
  - Fetch
  - Search
  - Status Filter
  - Sorting
  - Pagination
- Reset pagination to page 1 whenever the status filter changes
- Allow search and status filter to work together
- Update InventorySummary to display:
  - Showing X–Y of Z vehicles
  - Current search
  - Current status filter
  - Current sorting
- Keep CarTable presentational
- Preserve search, sorting, pagination, StatusBadge, edit, delete, toast notifications, loading state, empty state, and responsive behavior
- Verify frontend production build

## Purpose:

Improve inventory management by allowing users to filter vehicles by status while keeping filtering logic centralized in Cars.tsx and maintaining reusable UI components.

## Result:

Implemented a reusable StatusFilter component, integrated client-side status filtering with search, sorting, and pagination, enhanced InventorySummary with active filter information, preserved all existing inventory functionality, and verified the frontend production build completed successfully.

---

## Tool:
OpenAI Codex

## Prompt:

Implement reusable debounced inventory search.

Requirements:
- Create reusable useDebounce hook
- Generic TypeScript implementation
- Accept:
  - value
  - delay
- Return the debounced value
- Keep the hook reusable with no inventory-specific logic
- Replace direct inventory filtering with the debounced value
- Keep the search input fully controlled
- Use a 300 ms debounce delay
- Apply filtering only after the debounce completes
- Reset pagination only when the debounced search value changes
- Update InventorySummary to display the active debounced search value
- Display "All vehicles" when no search is active
- Preserve filtering order:
  - Fetch
  - Debounced Search
  - Status Filter
  - Sorting
  - Pagination
- Preserve search, status filtering, sorting, pagination, StatusBadge, edit, delete, toast notifications, loading state, empty state, and responsive behavior
- Verify frontend production build

## Purpose:

Improve inventory search performance and user experience by introducing a reusable debounce hook while maintaining clean separation between reusable utilities and page-specific business logic.

## Result:

Implemented a reusable generic useDebounce hook, integrated debounced searching into the inventory page, ensured pagination resets only after the debounced search value updates, preserved all existing functionality, and verified the frontend production build completed successfully.

---

## Tool:
OpenAI Codex

## Prompt:

Replace window.confirm with a reusable confirmation modal.

Requirements:
- Create reusable ConfirmationModal component
- Location:
  - frontend/src/components/ui/ConfirmationModal.tsx
- Keep the component completely reusable
- No inventory-specific logic

Props:
- open
- title
- message
- confirmLabel
- cancelLabel
- loading
- onConfirm
- onCancel

Modal requirements:
- Accessible dialog using proper ARIA attributes
- Close on Escape key
- Close when clicking backdrop
- Trap keyboard focus while open
- Restore focus after closing
- Prevent background scrolling while open
- Responsive desktop/mobile layout
- Use existing project styling
- Reuse existing Button and Card components
- Do not use external modal libraries

Cars.tsx changes:
- Replace browser window.confirm usage
- Store selected car before opening modal
- Open confirmation modal when delete is clicked
- Close modal on cancel
- Clear selected car after cancellation
- Execute existing delete API request on confirmation
- Close modal after successful deletion

Maintain:
- Existing deleting state
- Toast notifications
- API error handling
- Delete functionality

Preserve:
- Debounced search
- Status filter
- Sorting
- Pagination
- Inventory summary
- StatusBadge
- Edit functionality
- Responsive layout
- Empty states
- Loading states

Verify frontend production build.

## Purpose:

Improve the inventory management experience by replacing the browser confirmation dialog with a reusable accessible modal component while maintaining clean component architecture and separation of concerns.

## Result:

Implemented a reusable confirmation modal with accessibility features, focus management, responsive behavior, and integrated it into the inventory delete workflow. Existing delete functionality, error handling, loading states, and toast notifications were preserved, and the frontend production build completed successfully.