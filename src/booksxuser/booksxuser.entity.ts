import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Book } from 'src/books/book.entity';
import { User } from 'src/users/user.entity';

@Entity({ name: 'bookxuser' })
export class BookxUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bookxUsers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' }) // Define la clave foránea explícitamente
  user: User;

  @ManyToOne(() => Book, (book) => book.bookxUsers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' }) // Define la clave foránea explícitamente
  book: Book;

  @Column({ default: 0 })
  bookPercentaje: number;
}
