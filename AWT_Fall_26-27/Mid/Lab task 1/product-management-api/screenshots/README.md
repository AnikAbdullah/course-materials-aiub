# Postman evidence

All 14 screenshots were captured from successful requests in the Postman desktop application on 20 October 2026. They show the HTTP method, full URL, response status, and response body. POST and PATCH screenshots also show their JSON request bodies.

Products 1 and 2 were created for the sequence. Product 1 was updated and deleted; product 2 remains. Employee 1 was created, updated, and deleted using dummy details. Fresh GET requests confirmed both updates and deletions.

Start PostgreSQL and the application using the project README, then create the requests in Postman using `http://127.0.0.1:3000` as the base URL.

Import `../postman/Lab-Task-1.postman_collection.json` from this folder's parent project. Send the requests in order. Generated record IDs are filled in automatically. The collection's numbered request names match the screenshots below. Run `Setup Create second product` between requests 01 and 02.

Create two products before taking the get-all screenshot. Use the generated ID from the first product for the update and delete sequence.

| Filename | Request | Evidence |
| --- | --- | --- |
| `01-create.png` | POST `/products` | JSON request body and saved product with generated ID |
| `02-get-all.png` | GET `/products` | At least two saved products |
| `03-get-by-id.png` | GET `/products/:id` | First product using its actual ID |
| `04-update.png` | PATCH `/products/:id` | JSON request body and updated response |
| `05-confirm-update.png` | GET `/products/:id` | Changed price and quantity |
| `06-delete.png` | DELETE `/products/:id` | Successful deletion response |
| `07-confirm-delete.png` | GET `/products` | First product absent and second product still present |
| `08-create-employee.png` | POST `/employees` | Dummy employee request body and saved response |
| `09-get-employees.png` | GET `/employees` | Saved employee list |
| `10-get-employee-by-id.png` | GET `/employees/:id` | Employee using its actual ID |
| `11-update-employee.png` | PATCH `/employees/:id` | JSON request body and updated response |
| `12-confirm-employee-update.png` | GET `/employees/:id` | Changed phone and work experience |
| `13-delete-employee.png` | DELETE `/employees/:id` | Successful deletion response |
| `14-confirm-employee-delete.png` | GET `/employees` | Deleted employee absent |

Each image must show the HTTP method, full request URL with the actual record ID, response status, and response body. Keep POST and PATCH request bodies visible alongside the response. Use dummy employee details and never include a database password.
