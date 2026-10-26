import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Shop } from '../shops/shop.entity';
import { Category } from '../categories/category.entity';
import { Product } from '../products/product.entity';

export const databaseOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST ?? '127.0.0.1',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_DATABASE ?? 'antiqo_db',
  entities: [Shop, Category, Product],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: false,
};
export default new DataSource(databaseOptions);
