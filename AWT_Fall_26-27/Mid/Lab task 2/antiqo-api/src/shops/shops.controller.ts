import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateShopDto } from './create-shop.dto';
import { ShopService } from './shops.service';

@Controller('shops')
export class ShopController {
  constructor(private readonly service: ShopService) {}

  @Post()
  create(@Body() dto: CreateShopDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
