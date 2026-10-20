import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function databaseOptions(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: process.env.DB_HOST ?? '127.0.0.1',
    port: Number(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_DATABASE ?? 'product_management_db',
    autoLoadEntities: true,
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
  };
}
