import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Shop } from 'src/shop/shop.entity';

@Entity()
export class ItemsXUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.items)
  user: User;

  @ManyToOne(() => Shop, (shop) => shop.items)
  item: Shop;

  @CreateDateColumn()
  purchase_date: Date;
}
