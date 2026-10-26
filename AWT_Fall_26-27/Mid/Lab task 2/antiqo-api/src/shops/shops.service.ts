import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Shop } from './shop.entity';
import { CreateShopDto } from './create-shop.dto';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop) private readonly repository: Repository<Shop>,
  ) {}

  async create(dto: CreateShopDto) {
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
