CREATE TABLE orders (
  id      SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users (id),
  status  VARCHAR(10) CHECK (status IN ('active', 'complete')) NOT NULL
);