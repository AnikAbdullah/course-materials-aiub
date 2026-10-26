import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './create-product.dto';
import { Shop } from '../shops/shop.entity';
import { Category } from '../categories/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly repository: Repository<Product>,
  ) {}

  async create(dto: CreateProductDto) {
    if (
      !(await this.repository.manager
        .getRepository(Shop)
        .existsBy({ id: dto.shopId }))
    )
      throw new BadRequestException('Shop does not exist');
    if (
      !(await this.repository.manager
        .getRepository(Category)
        .existsBy({ id: dto.categoryId }))
    )
      throw new BadRequestException('Category does not exist');
    try {
      return await this.repository.save(
        this.repository.create({ ...dto, price: dto.price.toFixed(2) }),
      );
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const code = (error.driverError as { code?: string }).code;
        if (code === '23505')
          throw new ConflictException('Record already exists');
        if (code === '23503')
          throw new BadRequestException('Related record does not exist');
      }
      throw error;
    }
  }

  findAll() {
    return this.repository.find({ order: { id: 'ASC' } });
  }
}
