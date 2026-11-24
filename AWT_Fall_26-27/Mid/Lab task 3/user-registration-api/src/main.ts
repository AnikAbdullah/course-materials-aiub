import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // One pipe guards every endpoint:
  //  - whitelist: drop any field we didn't ask for
  //  - forbidNonWhitelisted: reject the request if it has extra fields
  //  - transform: turn the plain body into a real CreateUserDto instance
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(3000);
}
void bootstrap();
