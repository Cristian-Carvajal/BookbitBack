import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { createBookDto } from './dto/createBook.dto';
import { UpdateBookDto } from './dto/updateBook.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  async createBook(book: createBookDto) {
    const newBook = this.bookRepository.create(book);
    return await this.bookRepository.save(newBook);
  }

  getBooks() {
    return this.bookRepository.find();
  }

  getBook(id: number) {
    return this.bookRepository.findOne({
      where: {
        //Le paso la columna por la que voy a buscar
        id,
      },
    });
  }

  updateBook(id: number, book: UpdateBookDto) {
    return this.bookRepository.update(id, book);
  }

  deleteBook(id: number) {
    return this.bookRepository.delete({ id });
  }
}
