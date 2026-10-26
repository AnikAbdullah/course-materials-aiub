import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateIf,
  IsString,
  IsIn,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsNotEmpty()
  @IsString()
  @MaxLength(160)
  title: string;

  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsNotEmpty()
  @IsString()
  @MaxLength(5000)
  description: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @Max(9999999999.99)
  price: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(2147483647)
  stock: number;

  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsNotEmpty()
  @IsIn(['excellent', 'good', 'fair', 'poor'])
  condition: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(2147483647)
  shopId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(2147483647)
  categoryId: number;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @MaxLength(5000)
  defects?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(10000)
  approximateAge?: number;
}
