import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  async create(dto: CreateCategoryDto) {
    try {
      return await this.repository.save(this.repository.create(dto));
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
