# User Registration API

NestJS REST API that lets new users register. Every request is checked with a
DTO, class-validator decorators and a global `ValidationPipe`, so only
correctly formatted data ever reaches the controller.

## Run

```sh
npm install
npm run start:dev
```

The API runs at `http://localhost:3000`.

## Endpoint

| Method | Route            | Body            |
| ------ | ---------------- | --------------- |
| POST   | /users/register  | `CreateUserDto` |

A valid request returns `201 Created` with a welcome message and the user's
name, email, age and account type. The password is never sent back. Any field
that breaks a rule (or any extra field such as `isAdmin`) returns
`400 Bad Request`.

## Validation rules

| Field       | Rule                                                                   |
| ----------- | ---------------------------------------------------------------------- |
| fullName    | Required string, at least 3 characters                                 |
| email       | Required, must be a valid email address                                |
| password    | At least 8 characters with uppercase, lowercase, number and a symbol   |
| age         | Required whole number from 18 to 60                                    |
| phone       | Required, exactly 11 digits starting with 01                           |
| accountType | Must be either `student` or `teacher`                                  |
| address     | Optional, but at least 10 characters when provided                     |

## Sample requests

Valid request — `POST http://localhost:3000/users/register`

```json
{
  "fullName": "Rahim Ahmed",
  "email": "rahim@gmail.com",
  "password": "Rahim@123",
  "age": 22,
  "phone": "01712345678",
  "accountType": "student",
  "address": "Dhaka, Bangladesh"
}
```

Invalid request (bad email, weak password, under age, short phone, unknown
account type) — returns `400 Bad Request`:

```json
{
  "fullName": "Ra",
  "email": "invalid-email",
  "password": "12345",
  "age": 15,
  "phone": "1234",
  "accountType": "admin"
}
```
