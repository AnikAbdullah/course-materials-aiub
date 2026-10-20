import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  name: string;

  @Column({ length: 254 })
  email: string;

  @Column({ length: 30 })
  phone: string;

  @Column({ length: 100, select: false })
  password: string;

  @Column({ type: 'integer' })
  age: number;

  @Column({ type: 'integer' })
  yearsOfWorking: number;
}
