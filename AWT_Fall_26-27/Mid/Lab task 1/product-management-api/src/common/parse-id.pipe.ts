import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  ParseIntPipe,
} from '@nestjs/common';

@Injectable()
export class ParseIdPipe extends ParseIntPipe {
  async transform(value: string, metadata: ArgumentMetadata): Promise<number> {
    const id = await super.transform(value, metadata);
    if (id < 1 || id > 2147483647) {
      throw new BadRequestException('ID must be a positive 32-bit integer');
    }
    return id;
  }
}
