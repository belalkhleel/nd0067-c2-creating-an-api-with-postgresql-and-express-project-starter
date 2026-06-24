# Storefront Backend Project

A RESTful API built with Node.js, Express, TypeScript, and PostgreSQL.

---

## Requirements

Before running the project, make sure the following are installed:

- Node.js
- npm
- PostgreSQL

Verify installation:

```bash
node -v
npm -v
psql --version
```

---

## Ports

| Service             | Port |
|---------------------|------|
| Backend Server      | 3000 |
| PostgreSQL Database | 5432 |

---

## Package Installation

```bash
npm install
```

---

## Database Setup

### Step 1: Create Databases

Open PostgreSQL and run:

```sql
CREATE DATABASE storefront;
CREATE DATABASE storefront_test;
```

### Step 2: Configure Environment Variables

Create a `.env` file in the root directory:

```env
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=storefront
DB_TEST_NAME=storefront_test
DB_USER=postgres
DB_PASSWORD=your_password

BCRYPT_PASSWORD=your_pepper
SALT_ROUNDS=10
JWT_SECRET=your_secret_key

ENV=dev
```

### Step 3: Configure database.json

Update `database.json` with your PostgreSQL credentials:

```json
{
  "dev": {
    "driver": "pg",
    "host": "127.0.0.1",
    "database": "storefront",
    "user": "postgres",
    "password": "your_password"
  },
  "test": {
    "driver": "pg",
    "host": "127.0.0.1",
    "database": "storefront_test",
    "user": "postgres",
    "password": "your_password"
  }
}
```

### Step 4: Run Migrations

```bash
npm run db-up
```

For the test database:

```bash
npm run test-db-up
```

To rollback:

```bash
npm run db-down
npm run test-db-down
```

---

## Running the Server

```bash
npm start
```

or in watch mode:

```bash
npm run watch
```

The API will be available at `http://localhost:3000`.

---

## Running Tests

```bash
npm run test
```

All 37 tests should pass.

---

## Available Scripts

| Command               | Description                      |
|-----------------------|----------------------------------|
| `npm start`           | Start the server                 |
| `npm run watch`       | Run server in watch mode         |
| `npm run test`        | Run all tests                    |
| `npm run tsc`         | Compile TypeScript               |
| `npm run db-up`       | Run dev migrations               |
| `npm run db-down`     | Rollback dev migrations          |
| `npm run test-db-up`  | Run test migrations              |
| `npm run test-db-down`| Rollback test migrations         |

---

## Project Structure
src/

├── handlers/

│   ├── products.ts

│   ├── user.ts

│   ├── orders.ts

│   └── helpers.ts

├── models/

│   ├── product.ts

│   ├── user.ts

│   └── order.ts

├── database.ts

└── server.ts

spec/

├── models/

│   ├── product.spec.ts

│   ├── user.spec.ts

│   └── order.spec.ts

└── handlers/

├── product.spec.ts

├── user.spec.ts

└── order.spec.ts

migrations/

.env

database.json

package.json

REQUIREMENTS.md

---

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- TypeScript
- db-migrate
- bcrypt
- JWT (jsonwebtoken)
- Jest
- Supertest
- cross-env