import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ItemCategory } from 'src/itemCategory/itemCategory.entity';
import { ItemsXUser } from 'src/itemxuser/itemxuser.entity';

@Entity()
export class item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => ItemCategory, (category) => category.items)
  category: ItemCategory;

  @Column()
  value: number; // Precio en monedas de la app

  @OneToMany(() => ItemsXUser, (itemsXUser) => itemsXUser.item)
  items: ItemsXUser[]; // Relación inversa con ItemsXUser
}
