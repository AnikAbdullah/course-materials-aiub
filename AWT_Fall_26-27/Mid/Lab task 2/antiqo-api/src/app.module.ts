import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseOptions } from './database/data-source';
import { Shop } from './shops/shop.entity';
import { ShopController } from './shops/shops.controller';
import { ShopService } from './shops/shops.service';
import { Category } from './categories/category.entity';
import { CategoryController } from './categories/categories.controller';
import { CategoryService } from './categories/categories.service';
import { Product } from './products/product.entity';
import { ProductController } from './products/products.controller';
import { ProductService } from './products/products.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseOptions),
    TypeOrmModule.forFeature([Shop, Category, Product]),
  ],
  controllers: [ShopController, CategoryController, ProductController],
  providers: [ShopService, CategoryService, ProductService],
})
export class AppModule {}
