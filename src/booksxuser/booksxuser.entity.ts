import { Book } from 'src/books/book.entity';
import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

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
}
