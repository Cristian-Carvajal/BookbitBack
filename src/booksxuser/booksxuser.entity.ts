import { Book } from 'src/books/book.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'bookxuser' })
export class BookxUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  book_id: number;

  @ManyToOne(() => Book, (book) => book.id)
  book: Book;

//   @Column()
//   author: string;

//   @Column()
//   pages: number;

//   @Column() // esperar para conexión entre tablas
//   chapters: number;

//   @Column({ default: 0 })
//   publication_date: string;
}
