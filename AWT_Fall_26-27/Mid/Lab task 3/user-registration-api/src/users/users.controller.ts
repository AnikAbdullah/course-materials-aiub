import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  // POST /users/register
  // By the time we get here the ValidationPipe has already checked the
  // body against CreateUserDto, so we can trust the data is clean.
  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return {
      message: `Welcome, ${dto.fullName}! Your account has been created.`,
      user: {
        fullName: dto.fullName,
        email: dto.email,
        age: dto.age,
        accountType: dto.accountType,
      },
    };
  }
}
