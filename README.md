# Car Dealership Inventory Management System

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5%2F6-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-Testing-6E9F18?logo=vitest&logoColor=white)

Car Dealership Inventory Management System is a production-style MERN application for managing a car dealership’s vehicle inventory. It combines a React and TypeScript dashboard with an Express, MongoDB, and JWT-protected API to provide secure authentication, vehicle CRUD workflows, filtering, analytics, resilient loading and error states, and a reusable frontend architecture.

## Features

### Authentication

- JWT authentication for registration and sign-in
- Persistent login using browser storage with safe session restoration
- Protected and public-only routes
- Automatic session reset after unauthorized API responses

### Inventory Management

- Add, edit, and delete vehicles
- Inventory dashboard and vehicle listing
- Brand/model search with debouncing
- Status filtering
- Sortable vehicle data
- Client-side pagination

### Dashboard

- Statistics cards for inventory totals and status counts
- Inventory status chart powered by Recharts
- Quick actions for common inventory tasks
- Loading skeletons while dashboard data is loading

### User Experience

- Toast notifications for user feedback
- Delete confirmation modal
- Responsive layout and navigation
- Empty states for inventory results
- Local and global loading states
- API error messages and a global React error boundary with retry support

### Architecture

- Reusable UI and form components
- Context API for authentication, toast notifications, and global loading
- Custom `useAsync` and `useDebounce` hooks
- Axios API client with request and response interceptors
- Session persistence and reusable API utilities
- Route-level code splitting with `React.lazy` and `Suspense`

### Testing

- Vitest test runner
- React Testing Library and `@testing-library/jest-dom`
- Shared jsdom test configuration and cleanup

## Screenshots

> Replace each placeholder below with a repository-relative screenshot when assets are available. No live or external image URLs are assumed.

### Login Page

![Login Page](REPLACE_WITH_LOGIN_PAGE_SCREENSHOT)

### Dashboard

![Dashboard](REPLACE_WITH_DASHBOARD_SCREENSHOT)

### Inventory

![Inventory](REPLACE_WITH_INVENTORY_SCREENSHOT)

### Add Vehicle

![Add Vehicle](REPLACE_WITH_ADD_VEHICLE_SCREENSHOT)

### Edit Vehicle

![Edit Vehicle](REPLACE_WITH_EDIT_VEHICLE_SCREENSHOT)

## Tech Stack

### Frontend

| Technology | Purpose |
| --- | --- |
| React | Component-based user interface |
| TypeScript | Type-safe frontend development |
| Vite | Development server and production build tooling |
| React Router | Client-side routing and route protection |
| Axios | Centralized HTTP client and interceptors |
| Context API | Authentication, loading, and toast state |
| Recharts | Dashboard inventory visualization |

### Backend

| Technology | Purpose |
| --- | --- |
| Node.js | JavaScript runtime |
| Express.js | REST API framework |
| TypeScript | Type-safe server implementation |
| JWT | Authentication tokens for protected endpoints |
| bcryptjs | Password hashing |
| Swagger / OpenAPI | Interactive API documentation at `/api-docs` |

### Database

| Technology | Purpose |
| --- | --- |
| MongoDB | Persistent application data store |
| Mongoose | MongoDB models and database access |

### Testing

| Technology | Purpose |
| --- | --- |
| Vitest | Frontend test runner |
| React Testing Library | Component rendering and interaction tests |
| jest-dom | Accessible DOM matchers |
| jsdom | Browser-like test environment |
| Jest / Supertest | Existing backend API testing stack |

## Project Architecture

The frontend separates visual components, application state, asynchronous behavior, and HTTP communication so that features can grow without coupling page code to infrastructure details.

| Layer | Responsibility |
| --- | --- |
| **Component layer** | Reusable UI elements, forms, tables, modals, badges, and route layouts. Shared components keep presentation consistent. |
| **Context layer** | `AuthContext`, `ToastContext`, and `LoadingContext` provide application-wide state and actions without prop drilling. |
| **Hooks** | `useAsync` standardizes request state, while `useDebounce` avoids applying search input changes immediately. |
| **Services** | `apiClient` owns Axios defaults and interceptors; `api.ts` exposes focused vehicle API helpers. |
| **Utilities** | Shared API error formatting keeps request failures readable and consistent. |
| **Charts** | Recharts-based dashboard components are isolated from inventory and routing logic. |
| **Testing** | Vitest configuration and the shared setup file give component tests a consistent jsdom environment and matcher set. |

This structure scales because shared concerns—authentication, networking, errors, loading, and UI primitives—have one owner, while route pages remain focused on feature-level business logic.

## Folder Structure

```text
car-dealership-inventory-system/
├── backend/
│   ├── src/
│   │   ├── config/          # Database, environment, and Swagger configuration
│   │   ├── controllers/     # Authentication, vehicle, and user request handlers
│   │   ├── middleware/      # JWT authentication and error middleware
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # Express routes
│   │   ├── tests/           # Backend Jest and Supertest tests
│   │   ├── app.ts
│   │   └── server.ts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Layout, charts, forms, and reusable UI
│   │   ├── context/         # Auth, loading, and toast providers
│   │   ├── hooks/           # Reusable React hooks
│   │   ├── pages/           # Lazy-loaded route components
│   │   ├── services/        # Axios client and API helpers
│   │   ├── test/            # Shared Vitest setup
│   │   └── utils/           # API error utilities
│   ├── package.json
│   └── vite.config.ts
├── .env.example
└── README.md
```

## Installation

### Prerequisites

- Node.js and npm
- A running MongoDB instance or MongoDB connection string

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd car-dealership-inventory-system
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure backend environment variables

Set the backend variables described in [Environment Variables](#environment-variables) in your shell or deployment environment. The current backend reads values from `process.env`.

### 4. Run the backend

```bash
npm run dev
```

The backend defaults to port `5000` in `src/server.ts`. Swagger UI is available at `http://localhost:5000/api-docs/` when running locally.

### 5. Install frontend dependencies

Open another terminal from the repository root:

```bash
cd frontend
npm install
```

### 6. Configure the frontend API URL

Create `frontend/.env` and point the Vite client to the backend:

```env
VITE_API_URL=http://localhost:5000
```

### 7. Run the frontend

```bash
npm run dev
```

Vite prints the local development URL after startup.

## Environment Variables

### Backend

| Variable | Example | Description |
| --- | --- | --- |
| `PORT` | `5000` | Express server port. |
| `MONGO_URI` | `mongodb://localhost:27017/car-dealership-inventory` | MongoDB connection string. |
| `JWT_SECRET` | `replace_with_a_secure_secret` | Secret used to sign and verify JWTs. Use a strong value outside local development. |

### Frontend

| Variable | Example | Description |
| --- | --- | --- |
| `VITE_API_URL` | `http://localhost:5000` | Base URL consumed by the current Axios client. |
| `VITE_API_BASE_URL` | `http://localhost:5000` | Naming alternative for deployments; the current implementation reads `VITE_API_URL`, so set that variable for the app to connect. |

Never commit production secrets or environment files containing credentials.

## Available Scripts

Run these commands from the `frontend` directory.

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Runs TypeScript checks and creates an optimized production build. |
| `npm run test` | Runs the Vitest test suite once. |
| `npm run test:watch` | Runs Vitest in watch mode. |
| `npm run test:coverage` | Runs Vitest with V8 coverage reporting. |

The backend also provides `npm run dev`, `npm run build`, `npm start`, and `npm test` from the `backend` directory.

## Performance Optimizations

- **Route-level lazy loading:** route pages are loaded with `React.lazy` and `Suspense` instead of being included in the initial route render.
- **Code splitting:** Vite emits separate page chunks, including the dashboard and chart code.
- **Debounced search:** inventory search waits for input to settle before applying the filter.
- **Memoized context values:** authentication actions and context values avoid unnecessary consumer updates.
- **Axios interceptors:** request configuration and authorization headers are handled once in the API client.
- **Centralized async handling:** `useAsync` provides reusable loading, data, and error state for requests.
- **Global loading system:** significant mutations can use one consistent overlay rather than duplicating loading UI.
- **Reusable components and hooks:** shared UI and behavior reduce repeated rendering and business logic code.

## Testing

Frontend tests use Vitest with React Testing Library in a shared jsdom environment. The common setup imports jest-dom matchers and cleans the rendered DOM after each test, so future component tests need minimal boilerplate.

The current example, `StatusBadge.test.tsx`, verifies that the `StatusBadge` component renders the expected text for `available`, `sold`, `reserved`, and an unknown status. This establishes the pattern for future component, hook, and integration tests.

## Future Improvements

- Vehicle image uploads with cloud storage
- Refresh-token authentication and token rotation
- User roles and role-based authorization
- Advanced dealership analytics
- Inventory export capabilities
- Dark mode
- Inventory reports
- Email notifications

## License

This project is licensed under the [MIT License](LICENSE).
