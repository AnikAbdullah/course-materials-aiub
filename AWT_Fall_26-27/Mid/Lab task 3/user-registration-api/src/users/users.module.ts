import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';

// Groups everything related to users. For now that is just the
// registration controller, but new user features would be added here.
@Module({
  controllers: [UsersController],
})
export class UsersModule {}
