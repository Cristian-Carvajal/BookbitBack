import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { BookxUser } from 'src/booksxuser/booksxuser.entity';
import { ItemsXUser } from 'src/itemxuser/itemxuser.entity';
import { State } from 'src/state/state.entity';
import { Challenge } from 'src/challenge/challenge.entity';
import { AchievementxUser } from 'src/achievementxuser/achievementxuser.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  image: string;

  @ManyToOne(() => State, { eager: true })
  @JoinColumn({ name: 'state_id' })
  state: State;

  @Column({ default: 0 })
  coins: number;

  @OneToMany(() => ItemsXUser, (itemsXUser) => itemsXUser.user)
  items: ItemsXUser[];

  @Column({ nullable: true })
  currentAvatar: number;

  @OneToMany(() => BookxUser, (bookxUser) => bookxUser.user)
  bookxUsers: BookxUser[];

  @OneToMany(
    () => AchievementxUser,
    (achievementxUser) => achievementxUser.user,
  )
  achievementxUsers: AchievementxUser[];

  @OneToMany(() => Challenge, (challenge) => challenge.user)
  challenge: Challenge[];
}
