import { BookxUser } from 'src/booksxuser/booksxuser.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'book' })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column()
  editorial: string;

  @Column()
  pages: number;

  @Column()
  chapters: number;

  @Column({ type: 'date' })
  publication_date: Date;

  @OneToMany(() => BookxUser, (bookxUser) => bookxUser.book)
  bookxUsers: BookxUser[];
}
