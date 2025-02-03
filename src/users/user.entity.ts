import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { BookxUser } from 'src/booksxuser/booksxuser.entity';
import { ChallengeXUser } from 'src/challengexuser/challengexuser.entity';
import { ItemsXUser } from 'src/itemxuser/itemxuser.entity';
import { State } from 'src/state/state.entity';

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

  @OneToMany(() => BookxUser, (bookxUser) => bookxUser.user)
  bookxUsers: BookxUser[];

  @OneToMany(() => ChallengeXUser, (challengeXUser) => challengeXUser.user)
  challengeXUser: ChallengeXUser[];
}
