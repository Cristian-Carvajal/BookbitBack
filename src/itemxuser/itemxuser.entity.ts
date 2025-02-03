import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { item } from 'src/item/item.entity';

@Entity()
export class ItemsXUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.items)
  user: User;

  @ManyToOne(() => item, (item) => item.items)
  item: item;

  @CreateDateColumn()
  purchase_date: Date;
}
