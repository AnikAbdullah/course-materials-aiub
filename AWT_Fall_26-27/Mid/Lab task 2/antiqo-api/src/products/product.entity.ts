import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Shop } from '../shops/shop.entity';
import { Category } from '../categories/category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 160 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  price: string;

  @Column({ type: 'integer' })
  stock: number;

  @Column({ length: 30 })
  condition: string;

  @Column({ type: 'text', default: '' })
  defects: string;

  @Column({ type: 'integer', nullable: true })
  approximateAge: number | null;

  @Column()
  shopId: number;

  @ManyToOne(() => Shop, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'shopId' })
  shop: Shop;

  @Column()
  categoryId: number;

  @ManyToOne(() => Category, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
