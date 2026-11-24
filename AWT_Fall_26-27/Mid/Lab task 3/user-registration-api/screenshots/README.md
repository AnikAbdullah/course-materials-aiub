# Postman Validation Tests

Each request below was sent to `POST http://localhost:3000/users/register`.
The screenshots show the request body and the exact response from the running
API, covering the five cases from the lab task.

| # | Test | Input condition | Expected | Screenshot |
| - | ---- | --------------- | -------- | ---------- |
| 1 | All fields valid | Correct name, email, password, age, phone, account type | 201 Created | [01-valid.png](01-valid.png) |
| 2 | Invalid email | `email` is `invalid-email` | 400 Bad Request | [02-invalid-email.png](02-invalid-email.png) |
| 3 | Weak password | `password` is `12345` (too short, no upper/symbol) | 400 Bad Request | [03-weak-password.png](03-weak-password.png) |
| 4 | Age below 18 | `age` is `15` | 400 Bad Request | [04-under-age.png](04-under-age.png) |
| 5 | Unexpected property | Extra `isAdmin` field in the body | 400 Bad Request | [05-unexpected-isAdmin.png](05-unexpected-isAdmin.png) |

On the valid request the response returns the user's name, email, age and
account type — the password is never sent back. Every invalid request is
stopped by the global `ValidationPipe` before it reaches the controller, so the
client gets a clear `400 Bad Request` with the reason.
