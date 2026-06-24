# Storefront Backend API Requirements

## API Endpoints

### Products

| Method | Endpoint        | Auth Required | Description          |
|--------|-----------------|---------------|----------------------|
| GET    | `/products`     | ❌            | Get all products     |
| GET    | `/products/:id` | ❌            | Get product by id    |
| POST   | `/products`     | ✅            | Create a new product |
| PUT    | `/products/:id` | ✅            | Update a product     |
| DELETE | `/products/:id` | ✅            | Delete a product     |

### Users

| Method | Endpoint       | Auth Required | Description                           |
|--------|----------------|---------------|---------------------------------------|
| GET    | `/users`       | ✅            | Get all users                         |
| GET    | `/users/:id`   | ✅            | Get user by id                        |
| POST   | `/users`       | ❌            | Create a new user (returns JWT token) |
| POST   | `/users/login` | ❌            | Login and get JWT token               |
| PUT    | `/users/:id`   | ✅            | Update a user                         |
| DELETE | `/users/:id`   | ✅            | Delete a user                         |

### Orders

| Method | Endpoint                  | Auth Required | Description               |
|--------|---------------------------|---------------|---------------------------|
| GET    | `/orders/users/:userId`   | ✅            | Get current order by user |
| POST   | `/orders`                 | ✅            | Create a new order        |
| POST   | `/orders/:id/addProducts` | ✅            | Add product to order      |
| PUT    | `/orders/:id`             | ✅            | Update order status       |
| DELETE | `/orders/:id`             | ✅            | Delete an order           |

---

## Database Schema

### Users Table

| Column          | Type        | Constraints |
|-----------------|-------------|-------------|
| id              | SERIAL      | Primary Key |
| firstname       | VARCHAR(50) | NOT NULL    |
| lastname        | VARCHAR(50) | NOT NULL    |
| password_digest | TEXT        | NOT NULL    |

### Products Table

| Column | Type          | Constraints |
|--------|---------------|-------------|
| id     | SERIAL        | Primary Key |
| name   | VARCHAR(250)  | NOT NULL    |
| price  | NUMERIC(10,2) | NOT NULL    |

### Orders Table

| Column  | Type        | Constraints            |
|---------|-------------|------------------------|
| id      | SERIAL      | Primary Key            |
| user_id | INTEGER     | Foreign Key → users.id |
| status  | VARCHAR(10) | active / complete      |

### Orders_Products Table

| Column     | Type    | Constraints               |
|------------|---------|---------------------------|
| id         | SERIAL  | Primary Key               |
| order_id   | INTEGER | Foreign Key → orders.id   |
| product_id | INTEGER | Foreign Key → products.id |
| quantity   | INTEGER | NOT NULL                  |

---

## Data Shapes

### Product

```json
{
  "id": 1,
  "name": "Laptop",
  "price": 1500.00
}
```

### User

```json
{
  "id": 1,
  "firstname": "Belal",
  "lastname": "Khleel"
}
```

### Order

```json
{
  "id": 1,
  "user_id": 1,
  "status": "active"
}
```

### Order Product

```json
{
  "id": 1,
  "order_id": 1,
  "product_id": 1,
  "quantity": 2
}
```

---

## Models

### Product Model

| Method   | Description             |
|----------|-------------------------|
| `index`  | Get all products        |
| `show`   | Get product by id       |
| `create` | Create a new product    |
| `update` | Update a product by id  |
| `delete` | Delete a product by id  |

### User Model

| Method         | Description                        |
|----------------|------------------------------------|
| `index`        | Get all users                      |
| `show`         | Get user by id                     |
| `create`       | Create a new user (hashes password)|
| `update`       | Update a user by id                |
| `delete`       | Delete a user by id                |
| `authenticate` | Verify password and return user    |

### Order Model

| Method                  | Description                        |
|-------------------------|------------------------------------|
| `index`                 | Get all orders                     |
| `show`                  | Get order by id                    |
| `create`                | Create a new order                 |
| `update`                | Update order status by id          |
| `delete`                | Delete order and its products      |
| `addProduct`            | Add product to an order            |
| `currentOrderByUser`    | Get active order for a user        |
| `completedOrdersByUser` | Get all completed orders for a user|

---

## Security

- Passwords are hashed using **bcrypt** with a pepper and configurable salt rounds
- Protected routes require a **JWT token** passed in the `Authorization` header as `Bearer <token>`
- Tokens are generated on user creation (`POST /users`) and login (`POST /users/login`)
- Tokens expire after **1 hour**

---

## Environment Variables

| Variable         | Description                        |
|------------------|------------------------------------|
| `DB_HOST`        | Database host (e.g. 127.0.0.1)    |
| `DB_PORT`        | Database port (e.g. 5432)         |
| `DB_NAME`        | Dev database name                  |
| `DB_TEST_NAME`   | Test database name                 |
| `DB_USER`        | Database user                      |
| `DB_PASSWORD`    | Database password                  |
| `BCRYPT_PASSWORD`| Pepper for password hashing        |
| `SALT_ROUNDS`    | bcrypt salt rounds (e.g. 10)      |
| `JWT_SECRET`     | Secret key for signing JWT tokens  |
| `ENV`            | Environment: `dev` or `test`       |