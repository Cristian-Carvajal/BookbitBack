import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { item } from 'src/item/item.entity';

@Entity()
export class ItemCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => item, (item) => item.category)
  items: item[];
}
