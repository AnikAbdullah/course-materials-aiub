import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeesRepository: Repository<Employee>,
  ) {}

  async create(dto: CreateEmployeeDto) {
    this.validateExperience(dto.age, dto.yearsOfWorking);
    const employee = await this.employeesRepository.save(
      this.employeesRepository.create(dto),
    );
    return this.findOne(employee.id);
  }

  findAll() {
    return this.employeesRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const employee = await this.employeesRepository.findOneBy({ id });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async update(id: number, dto: UpdateEmployeeDto) {
    if (Object.keys(dto).length === 0) {
      throw new BadRequestException('Provide at least one employee field');
    }
    const employee = await this.findOne(id);
    this.validateExperience(
      dto.age ?? employee.age,
      dto.yearsOfWorking ?? employee.yearsOfWorking,
    );
    await this.employeesRepository.save(
      this.employeesRepository.merge(employee, dto),
    );
    return this.findOne(id);
  }

  async remove(id: number) {
    const employee = await this.findOne(id);
    await this.employeesRepository.remove(employee);
    return { message: 'Employee deleted successfully', id };
  }

  private validateExperience(age: number, yearsOfWorking: number) {
    if (yearsOfWorking > age) {
      throw new BadRequestException('Work experience cannot exceed age');
    }
  }
}
