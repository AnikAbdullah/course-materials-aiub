import { Module } from '@nestjs/common';
import { CourseModule } from './course/course.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CourseModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgress',
      password: '201592',
      database: 'course_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
