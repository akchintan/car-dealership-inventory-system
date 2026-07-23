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
