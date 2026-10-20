import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  name: string;

  @Column({ length: 80 })
  category: string;

  @Column({ type: 'double precision' })
  price: number;

  @Column({ type: 'integer' })
  quantity: number;
}
