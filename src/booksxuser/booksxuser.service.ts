import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookxUser } from './booksxuser.entity';
import { User } from 'src/users/user.entity';
import { Book } from 'src/books/book.entity';

@Injectable()
export class BookxUserService {
  constructor(
    @InjectRepository(BookxUser)
    private readonly bookxUserRepository: Repository<BookxUser>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  // 📌 Agregar un libro a la biblioteca del usuario
  async addBookToUser(userId: number, bookId: number): Promise<BookxUser> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const book = await this.bookRepository.findOne({ where: { id: bookId } });

    if (!user || !book) {
      throw new NotFoundException('Usuario o libro no encontrado');
    }

    const bookxUser = this.bookxUserRepository.create({ user, book });
    return this.bookxUserRepository.save(bookxUser);
  }

  // 📌 Eliminar un libro de la biblioteca del usuario
  async removeBookFromUser(userId: number, bookId: number): Promise<void> {
    const bookxUser = await this.bookxUserRepository.findOne({
      where: { user: { id: userId }, book: { id: bookId } },
    });

    if (!bookxUser) {
      throw new NotFoundException(
        'El libro no está en la biblioteca del usuario',
      );
    }

    await this.bookxUserRepository.remove(bookxUser);
  }

  // 📌 Obtener los libros de un usuario
  async getUserBooks(userId: number): Promise<Book[]> {
    const userBooks = await this.bookxUserRepository.find({
      where: { user: { id: userId } },
      relations: ['book'],
    });

    const books: Book[] = [];
    for (const entry of userBooks) {
      books.push(entry.book);
    }

    return books;
  }
}
