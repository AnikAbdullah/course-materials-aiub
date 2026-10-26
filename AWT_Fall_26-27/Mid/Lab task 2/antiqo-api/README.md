# Antiqo API

NestJS REST API for shops, categories and vintage products, using PostgreSQL and TypeORM migrations.

## Run

Configure your PostgreSQL credentials in `.env`, using `.env.example` as a reference. The database is `antiqo_db`.

```sh
npm install
npm run migration:run
npm run start:dev
```

The API runs at `http://127.0.0.1:3002`. Build and start commands recreate `dist` when needed.

## Endpoints

| Entity | Create | List |
| --- | --- | --- |
| Shops | POST /shops | GET /shops |
| Categories | POST /categories | GET /categories |
| Products | POST /products | GET /products |

Create a shop and category before a product. Products require their `shopId` and `categoryId`. Empty required fields return 400 Bad Request.

## Migrations

The generated initial migration is in `src/database/migrations`. Schema synchronization is disabled.

```sh
npm run migration:show
npm run migration:generate -- src/database/migrations/UpdateSchema
npm run migration:run
npm run migration:revert
```

Reverting the initial migration removes the three tables and their records.

## Validation

Postman completed nine requests with 21 passing assertions and no failures or errors. All three entities were created and retrieved, and empty required fields returned 400. The build and 91 DTO validation checks also passed before the test utilities were removed.
