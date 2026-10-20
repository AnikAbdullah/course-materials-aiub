import {
  IsInt,
  IsNumber,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Matches(/\S/)
  @MaxLength(120)
  name: string;

  @IsString()
  @Matches(/\S/)
  @MaxLength(80)
  category: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  @IsInt()
  @Min(0)
  @Max(2147483647)
  quantity: number;
}
