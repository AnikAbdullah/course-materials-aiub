import { Controller } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  getAllCourses() {
    return this.courseService.getAllCourses();
  }

  getCourseByName(name: string) {
    return this.courseService.getCourseByName(name);
  }

  createCourse(name: string, code: string) {
    return this.courseService.createCourse(name, code);
  }
  deleteCourse(id: string) {
    return this.courseService.deleteCourse(id);
  }
}
