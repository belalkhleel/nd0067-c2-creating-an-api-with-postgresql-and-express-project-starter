# Storefront Backend API Requirements

## Server Configuration

### Server Port

* API Server: `3000`

### Database Port

* PostgreSQL: `5432`

---

# Environment Variables

Create a `.env` file in the project root:

```env
DB_USER=postgres
DB_HOST=127.0.0.1
DB_NAME=storefront
DB_PASSWORD=your_password
DB_PORT=5432

BCRYPT_PASSWORD=your_pepper
SALT_ROUNDS=10
JWT_SECRET=your_jwt_secret

ENV=dev
```

---

# Package Installation

Install project dependencies:

```bash
npm install
```

---

# Database Setup

## Create Databases

Open PostgreSQL and create the databases:

```sql
CREATE DATABASE storefront;
CREATE DATABASE storefront_test;
```

## Configure database.json

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

## Run Migrations

```bash
npm run db-up
```

Rollback migrations:

```bash
npm run db-down
```

---

# Running the Application

Development:

```bash
npm start
```

Watch mode:

```bash
npm run watch
```

The API will be available at:

```
http://localhost:3000
```

---

# Database Schema

## Users Table

| Column    | Type         | Constraints |
|-----------|--------------|-------------|
| id        | SERIAL       | Primary Key |
| firstname | VARCHAR(50)  | NOT NULL    |
| lastname  | VARCHAR(50)  | NOT NULL    |
| password  | TEXT         | NOT NULL (bcrypt hashed) |

---

## Products Table

| Column   | Type          | Constraints |
|----------|---------------|-------------|
| id       | SERIAL        | Primary Key |
| name     | VARCHAR(250)  | NOT NULL    |
| price    | NUMERIC(10,2) | NOT NULL    |
| category | VARCHAR(100)  | OPTIONAL    |

---

## Orders Table

| Column  | Type        | Constraints            |
|---------|-------------|------------------------|
| id      | SERIAL      | Primary Key            |
| user_id | INTEGER     | Foreign Key → users.id |
| status  | VARCHAR(10) | active / complete      |

---

## Order_Products Table

This table implements the many-to-many relationship between orders and products.

| Column     | Type    | Constraints               |
|------------|---------|---------------------------|
| id         | SERIAL  | Primary Key               |
| order_id   | INTEGER | Foreign Key → orders.id   |
| product_id | INTEGER | Foreign Key → products.id |
| quantity   | INTEGER | NOT NULL                  |

---

# Data Shapes

## Product

```json
{
  "id": 1,
  "name": "Laptop",
  "price": 1500.00,
  "category": "Electronics"
}
```

## User

```json
{
  "id": 1,
  "firstname": "Belal",
  "lastname": "Khleel"
}
```

## Order

```json
{
  "id": 1,
  "user_id": 1,
  "status": "active"
}
```

---

# API Endpoints

## Products

### Index Products

```http
GET /products
```

Returns all products.

---

### Show Product

```http
GET /products/:id
```

Returns a single product.

---

### Create Product

```http
POST /products
```

Token Required.

Request Body:

```json
{
  "name": "Laptop",
  "price": 1500.00,
  "category": "Electronics"
}
```

---

## Users

### Index Users

```http
GET /users
```

Token Required.

---

### Show User

```http
GET /users/:id
```

Token Required.

---

### Create User

```http
POST /users
```

Request Body:

```json
{
  "firstname": "Belal",
  "lastname": "Khleel",
  "password": "password123"
}
```

Returns a JWT token.

---

## Orders

### Create Order

```http
POST /orders
```

Token Required.

Request Body:

```json
{
  "user_id": 1,
  "status": "active"
}
```

---

### Add Product to Order

```http
POST /orders/:id/addProducts
```

Token Required.

Request Body:

```json
{
  "product_id": 1,
  "quantity": 2
}
```

---

### Current Order By User

```http
GET /orders/users/:userId
```

Token Required.

Returns the active order for a user.

---

# Available NPM Scripts

```bash
npm start        # Start the server
npm run watch    # Watch mode
npm run test     # Run tests
npm run tsc      # Compile TypeScript
npm run db-up    # Run migrations
npm run db-down  # Rollback migrations
```

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
