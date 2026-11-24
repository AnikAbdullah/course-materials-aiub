import { Type } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/, {
    message:
      'password must contain an uppercase letter, a lowercase letter, a number and a special character',
  })
  password: string;

  @Type(() => Number)
  @IsInt()
  @Min(18)
  @Max(60)
  age: number;

  @Matches(/^01\d{9}$/, {
    message: 'phone must be 11 digits and start with 01',
  })
  phone: string;

  @IsIn(['student', 'teacher'])
  accountType: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  address?: string;
}
