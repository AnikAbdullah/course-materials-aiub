import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {
  getAllCourses(): string {
    return 'Get All Courses';
  }

  getCourseById(id: string): string {
    return `Get Course by ID: ${id}`;
  }

  createCourse(): string {
    return 'Create Course';
  }

  updateCourse(id: string): string {
    return `Update Course ${id}`;
  }

  patchCourse(id: string): string {
    return `Patch Course ${id}`;
  }

  deleteCourse(id: string): string {
    return `Delete Course ${id}`;
  }
}
