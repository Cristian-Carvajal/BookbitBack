import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Shop } from 'src/shop/shop.entity';

@Entity()
export class ItemCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Shop, (shop) => shop.category)
  items: Shop[];
}
