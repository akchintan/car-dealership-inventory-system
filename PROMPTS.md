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
