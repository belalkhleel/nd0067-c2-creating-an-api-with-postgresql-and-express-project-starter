# Storefront Backend Project

A RESTful API built with Node.js, Express, TypeScript, and PostgreSQL.

---

# Requirements

Before running the project, make sure the following software is installed:

* Node.js
* npm
* PostgreSQL
* db-migrate (installed automatically through project dependencies)

Verify installation:

```bash
node -v
npm -v
psql --version
```

---

# Ports

The application uses the following ports:

| Service             | Port |
|---------------------|------|
| Backend Server      | 3000 |
| PostgreSQL Database | 5432 |

---

# Package Installation

Install all project dependencies:

```bash
npm install
```

---

# Database Setup

## Step 1: Create Database

Open PostgreSQL and create the databases:

```sql
CREATE DATABASE storefront;
CREATE DATABASE storefront_test;
```

---

## Step 2: Configure Environment Variables

Create a `.env` file in the root directory:

```env
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=storefront
DB_USER=postgres
DB_PASSWORD=your_password

BCRYPT_PASSWORD=your_pepper
SALT_ROUNDS=10
JWT_SECRET=your_secret_key

ENV=dev
```

Update the values according to your PostgreSQL installation.

---

## Step 3: Configure database.json

Update the database connection settings inside `database.json`:

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

---

## Step 4: Run Database Migrations

Create all required tables:

```bash
npm run db-up
```

If you need to rollback migrations:

```bash
npm run db-down
```

---

# Running the Server

Start the application:

```bash
npm start
```

or

```bash
npm run watch
```

The API will be available at:

```
http://localhost:3000
```

---

# Running Tests

Run all unit and integration tests:

```bash
npm run test
```

If all tests pass successfully, the setup is complete.

---

# Available Scripts

| Command           | Description               |
|-------------------|---------------------------|
| `npm start`       | Start the server          |
| `npm run watch`   | Run server in watch mode  |
| `npm run test`    | Execute all tests         |
| `npm run db-up`   | Run migrations            |
| `npm run db-down` | Rollback migrations       |
| `npm run tsc`     | Compile TypeScript        |

---

# Project Structure

```
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
```

---

# API Endpoints

## Products

| Method | Endpoint        | Auth Required | Description           |
|--------|-----------------|:---:|-----------------------|
| GET    | `/products`     | ❌  | Get all products      |
| GET    | `/products/:id` | ❌  | Get product by id     |
| POST   | `/products`     | ✅  | Create a new product  |

---

## Users

| Method | Endpoint      | Auth Required | Description                          |
|--------|---------------|:---:|--------------------------------------|
| GET    | `/users`      | ✅  | Get all users                        |
| GET    | `/users/:id`  | ✅  | Get user by id                       |
| POST   | `/users`      | ❌  | Create a new user (returns JWT token)|

---

## Orders

| Method | Endpoint                    | Auth Required | Description              |
|--------|-----------------------------|:---:|--------------------------|
| POST   | `/orders`                   | ✅  | Create a new order       |
| POST   | `/orders/:id/addProducts`   | ✅  | Add product to order     |
| GET    | `/orders/users/:userId`     | ✅  | Get current order by user|

---

# Technologies Used

* Node.js
* Express.js
* PostgreSQL
* TypeScript
* db-migrate
* bcrypt
* JWT (jsonwebtoken)
* Jest
* Supertest

---

After completing the steps above, the application should be connected to PostgreSQL, migrations should be applied successfully, and all tests should pass.
