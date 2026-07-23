# Car Dealership Inventory System

Car Dealership Inventory System is a TypeScript backend API for managing dealership car inventory and user access. It provides registration and login endpoints, JWT-protected car and user routes, and CRUD operations for cars. The car listing supports brand and status filtering, with optional pagination. Swagger UI is available for browsing the API documentation.

![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Language-3178C6?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-Web%20Framework-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-Testing-C21325?logo=jest&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-API%20Documentation-85EA2D?logo=swagger&logoColor=black)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running Tests](#running-tests)
- [API Documentation](#api-documentation)
- [Available API Endpoints](#available-api-endpoints)
- [Testing](#testing)
- [Future Improvements](#future-improvements)
- [Author](#author)

## Features

- User registration with input and password-strength checks
- Password hashing with bcrypt and JWT-based login tokens
- JWT-protected car inventory and user-profile routes
- Create, retrieve, update, and delete car inventory records
- Filter cars by `brand` and `status`
- Optional car-list pagination using `page` and `limit`
- Standard JSON error responses for unhandled Express errors
- Swagger UI API documentation

## Tech Stack

**Backend:** Node.js, Express, TypeScript

**Database:** MongoDB with Mongoose

**Testing:** Jest, ts-jest, Supertest

**Documentation:** OpenAPI 3.0, swagger-jsdoc, swagger-ui-express

**Authentication:** JSON Web Tokens, bcryptjs

## Project Structure

```text
car-dealership-inventory-system/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts
│   │   │   ├── env.ts
│   │   │   └── swagger.ts
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   ├── car.controller.ts
│   │   │   └── user.controller.ts
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts
│   │   │   └── error.middleware.ts
│   │   ├── models/
│   │   │   ├── car.model.ts
│   │   │   └── user.model.ts
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── car.routes.ts
│   │   │   └── user.routes.ts
│   │   ├── tests/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── jest.config.js
│   ├── package.json
│   └── tsconfig.json
├── frontend/                 # Currently empty
├── PROMPTS.md
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- A MongoDB instance when using the database connection configuration

### Installation

```bash
git clone <repository-url>
cd car-dealership-inventory-system/backend
npm install
```

### Running locally

Set the environment variables listed below in your shell or hosting environment, then start the development server:

```bash
npm run dev
```

To build and run the compiled application:

```bash
npm run build
npm start
```

## Environment Variables

The repository does not initialize `dotenv`, so provide these values through your shell, process manager, or deployment environment. Do not commit real secrets.

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/car-dealership-inventory
JWT_SECRET=replace_with_a_secure_secret
```

- `PORT` is used by the server and defaults to `5000` there.
- `MONGO_URI` is required by the existing database connector. The code reads `MONGO_URI`, not `MONGODB_URI`.
- `JWT_SECRET` is used when signing and verifying authentication tokens. Set a secure value outside local development.

## Running Tests

From the `backend` directory, run:

```bash
npm test
```

To run an individual test file, pass its path to Jest:

```bash
npm test -- --runInBand src/tests/cars/get-cars.test.ts
```

## API Documentation

Start the backend and open Swagger UI at:

```text
/api-docs
```

For a local server running on port 5000, visit `http://localhost:5000/api-docs/`.

## Available API Endpoints

| Method | Endpoint | Description | Authentication Required |
| --- | --- | --- | --- |
| GET | `/` | API status response | No |
| POST | `/api/auth/register` | Register a user | No |
| POST | `/api/auth/login` | Log in and receive a JWT | No |
| POST | `/api/cars` | Create a car | Yes |
| GET | `/api/cars` | List cars; supports `brand`, `status`, `page`, and `limit` query parameters | Yes |
| GET | `/api/cars/:id` | Retrieve a car by ID | Yes |
| PUT | `/api/cars/:id` | Update a car by ID | Yes |
| DELETE | `/api/cars/:id` | Delete a car by ID | Yes |
| GET | `/api/users/me` | Retrieve the authenticated user's profile | Yes |
| GET | `/api-docs/` | Serve Swagger UI documentation | No |

For protected endpoints, send a valid JWT in the `Authorization` header using the `Bearer <token>` format.

## Testing

The backend is developed with a Red-Green TDD workflow: tests describe the expected behavior first, implementation is added to make them pass, and regressions are checked through the Jest suite. Jest runs the TypeScript tests, while Supertest exercises the Express API through HTTP requests. The test suite covers application behavior, authentication, cars, configuration, database configuration, middleware, models, and Swagger UI availability.

## Future Improvements

- Docker support for consistent local development and deployment
- Deployment configuration for a hosted environment
- A frontend application for inventory management
- CI/CD workflows for automated testing and releases
- Role-based authorization for differentiated user access

## Author

Created by Chintan
