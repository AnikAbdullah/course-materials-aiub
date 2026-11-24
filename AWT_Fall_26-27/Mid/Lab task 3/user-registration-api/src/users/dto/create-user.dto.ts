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

// Everything a new user is allowed to send when they register.
// Each field below carries its own rules, so the controller never
// has to check anything by hand.
export class CreateUserDto {
  // Full name, at least 3 characters so we don't accept things like "Ra".
  @IsString()
  @MinLength(3)
  fullName: string;

  // Must look like a real email address, e.g. rahim@gmail.com.
  @IsEmail()
  email: string;

  // A strong password: 8+ characters with an uppercase letter,
  // a lowercase letter, a number and a special character.
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/, {
    message:
      'password must contain an uppercase letter, a lowercase letter, a number and a special character',
  })
  password: string;

  // Age has to be a whole number between 18 and 60.
  // @Type helps turn "22" into 22 when transform is on.
  @Type(() => Number)
  @IsInt()
  @Min(18)
  @Max(60)
  age: number;

  // Phone: exactly 11 digits that start with 01, e.g. 01712345678.
  @Matches(/^01\d{9}$/, {
    message: 'phone must be 11 digits and start with 01',
  })
  phone: string;

  // Only students and teachers can sign up here.
  @IsIn(['student', 'teacher'])
  accountType: string;

  // Address is optional, but if it is given it should be a bit detailed.
  @IsOptional()
  @IsString()
  @MinLength(10)
  address?: string;
}
