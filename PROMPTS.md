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
