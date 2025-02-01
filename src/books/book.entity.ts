import { BookxUser } from 'src/booksxuser/booksxuser.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'book' })
export class Book {
  @OneToMany(() => BookxUser, (bookxUser) => bookxUser.book)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column()
  pages: number;

  @Column() // esperar para conexión entre tablas
  chapters: number;

  @Column({ default: 0 })
  publication_date: string;
}
