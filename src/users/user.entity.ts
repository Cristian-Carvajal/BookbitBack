import { BookxUser } from 'src/booksxuser/booksxuser.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  avatar: string;

  @ManyToOne(() => State, { eager: true })
  @JoinColumn({ name: 'id_status' })
  state: State;

  @Column({ default: 0 })
  coins: number;

  @ManyToOne(() => Reward, { nullable: true })
  @JoinColumn({ name: 'current_avatar' })
  currentAvatar: Reward;

  @OneToMany(() => BookxUser, (bookxUser) => bookxUser.user)
  bookxUsers: BookxUser[];
}
