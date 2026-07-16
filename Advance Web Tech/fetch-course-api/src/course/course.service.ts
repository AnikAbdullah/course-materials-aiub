import { Injectable } from '@nestjs/common';
import { Course } from './entities/courses.entity';

@Injectable()
export class CourseService {
  private courses: Course[] = [];

  getAllCourses() {
    return this.courses;
  }

  getCourseByName(name: string) {
    return this.courses.find((course) => course.courseName === name);
  }

  createCourse(name: string, code: string) {
    const course: Course = {
      id: this.courses.length + 1,
      courseName: name,
      credit: 3,
      department: 'CSE',
    };
    this.courses.push(course);
    return course;
  }

  deleteCourse(id: string) {
    const index = this.courses.findIndex((course) => course.id === Number(id));
    if (index !== -1) {
      return null;
    }
    const deletedCourse = this.courses[index];
    this.courses.splice(index, 1);
    return deletedCourse;
  }
}
