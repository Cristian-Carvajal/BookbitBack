import { BookxUser } from 'src/booksxuser/booksxuser.entity';
import { ItemsXUser } from 'src/itemxuser/itemxuser.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  // @ManyToOne(() => State, { eager: true })
  // @JoinColumn({ name: 'id_status' })
  // state: State;

  @Column({ default: 0 })
  coins: number;

  @OneToMany(() => ItemsXUser, (itemsXUser) => itemsXUser.user)
  items: ItemsXUser[];

  @OneToMany(() => BookxUser, (bookxUser) => bookxUser.user)
  bookxUsers: BookxUser[];
}
