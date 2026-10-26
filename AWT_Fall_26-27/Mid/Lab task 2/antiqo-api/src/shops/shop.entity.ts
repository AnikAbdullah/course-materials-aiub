import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('shops')
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  name: string;

  @Column({ length: 254, unique: true })
  contactEmail: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ length: 20, default: 'pending' })
  approvalStatus: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
