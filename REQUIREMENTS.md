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

| Method | Endpoint         | Auth Required | Description                          |
|--------|------------------|---------------|--------------------------------------|
| GET    | `/users`         | ✅            | Get all users                        |
| GET    | `/users/:id`     | ✅            | Get user by id                       |
| POST   | `/users`         | ❌            | Create a new user (returns JWT token)|
| POST   | `/users/login`   | ❌            | Login and get JWT token              |
| PUT    | `/users/:id`     | ✅            | Update a user                        |
| DELETE | `/users/:id`     | ✅            | Delete a user                        |

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

| Column          | Type         | Constraints          |
|-----------------|--------------|----------------------|
| id              | SERIAL       | Primary Key          |
| firstname       | VARCHAR(50)  | NOT NULL             |
| lastname        | VARCHAR(50)  | NOT NULL             |
| password_digest | TEXT         | NOT NULL             |

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