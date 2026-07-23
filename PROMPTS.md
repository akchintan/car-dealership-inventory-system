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
