import {
  IsEmail,
  IsInt,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @Matches(/\S/)
  @MaxLength(120)
  name: string;

  @IsEmail()
  @MaxLength(254)
  email: string;

  @IsString()
  @Matches(/^\+?[0-9 ()-]{7,30}$/)
  phone: string;

  @IsString()
  @Matches(/\S/)
  @MinLength(6)
  @MaxLength(100)
  password: string;

  @IsInt()
  @Min(0)
  @Max(120)
  age: number;

  @IsInt()
  @Min(0)
  @Max(120)
  yearsOfWorking: number;
}
