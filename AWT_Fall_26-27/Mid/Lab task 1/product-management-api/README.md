# Lab Task 1: Product and Employee Management

NestJS REST API for a shop's products and employees. Both modules use TypeORM repositories to read and write PostgreSQL records. PostgreSQL generates the primary keys.

## Student details

| Field      | Value                     |
| ---------- | ------------------------- |
| Name       | Anik                      |
| Student ID | 22-42028-2                |
| SL         | 3                         |
| Section    | D                         |
| Course     | Advanced Web Technologies |
| Semester   | Fall 2026-2027            |

## Requirements

- Node.js 20.19 or later; Node.js 24 is recommended.
- npm.
- A running PostgreSQL server and a database account that can create tables.
- Postman for the request screenshots.

## Database setup

Start PostgreSQL, then create the application database using pgAdmin or psql:

```sh
psql -h 127.0.0.1 -U postgres -c "CREATE DATABASE product_management_db;"
```

The command prompts for your PostgreSQL password if required. Replace `postgres` with your database username when necessary.

From this project directory:

```sh
cp .env.example .env
npm ci
```

Set `DB_USERNAME` and `DB_PASSWORD` in `.env` to your local database credentials. Change the host or port if PostgreSQL uses a different address. Keep `DB_DATABASE=product_management_db` and `DB_SYNCHRONIZE=true` for this lab. TypeORM creates the product and employee tables when the API starts. Automatic synchronization is intended for this development exercise.

`.env`, `node_modules`, build output, and logs are ignored by Git. `.env.example` contains sample settings only.

## Run

```sh
npm run start:dev
```

The API listens at `http://127.0.0.1:3000`. To run the compiled application:

```sh
npm run build
npm run start:prod
```

## Endpoints

| Method | Path             | Success | Behavior                             |
| ------ | ---------------- | ------- | ------------------------------------ |
| POST   | `/products`      | 201     | Save a product                       |
| GET    | `/products`      | 200     | Return all products                  |
| GET    | `/products/:id`  | 200     | Return one product                   |
| PATCH  | `/products/:id`  | 200     | Update supplied product fields       |
| DELETE | `/products/:id`  | 200     | Delete a product and return its ID   |
| POST   | `/employees`     | 201     | Save an employee                     |
| GET    | `/employees`     | 200     | Return all employees                 |
| GET    | `/employees/:id` | 200     | Return one employee                  |
| PATCH  | `/employees/:id` | 200     | Update supplied employee fields      |
| DELETE | `/employees/:id` | 200     | Delete an employee and return its ID |

Invalid bodies and malformed or out-of-range IDs return `400 Bad Request`. An absent record returns `404 Not Found`. PATCH leaves omitted fields unchanged and rejects empty bodies or explicit null values. Extra fields, including client-supplied IDs, are rejected.

### Create a product

Send `POST http://127.0.0.1:3000/products` with `Content-Type: application/json`:

```json
{
  "name": "Notebook",
  "category": "Stationery",
  "price": 85.5,
  "quantity": 20
}
```

`name` and `category` must contain text. Price must be a nonnegative number with at most two decimal places. Quantity must be a nonnegative 32-bit integer. The response contains the saved fields and the generated `id`.

For PATCH, send only the fields to change:

```json
{
  "price": 90,
  "quantity": 15
}
```

### Create an employee

Send `POST http://127.0.0.1:3000/employees`:

```json
{
  "name": "Test Employee",
  "email": "employee@example.com",
  "phone": "01700000000",
  "password": "dummy123",
  "age": 25,
  "yearsOfWorking": 3
}
```

Phone is a string so leading zeroes are preserved. Email must be valid. Age and completed years of work must be integers from 0 to 120, and work experience cannot exceed age. The dummy password must contain 6-100 characters. This lab stores dummy passwords as supplied and excludes them from all API responses. Use test values only; this task does not implement authentication.

## Checks

```sh
npm run format:check
npm run build
```

After starting the application, verify each endpoint in Postman. Restart the API and fetch a saved record again to confirm that PostgreSQL retains the data.
