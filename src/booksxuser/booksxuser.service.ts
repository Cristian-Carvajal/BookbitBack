import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookxUser } from './booksxuser.entity';
import { Repository } from 'typeorm';
import { createBookxUserDto } from './dto/createBookxUserDto.dto';
import { BooksService } from 'src/books/books.service';

@Injectable()
export class BooksxuserService {
  constructor(
    @InjectRepository(BookxUser)
    private bookxUserRepository: Repository<BookxUser>,
    private booksService: BooksService,
  ) {}

  async createBookxUser(bookxUser: createBookxUserDto) {
    const bookFound = await this.booksService.getBook(bookxUser.book_id);

    if (!bookFound)
      return new HttpException('User not found', HttpStatus.NOT_FOUND);

    const newBookxUser = this.bookxUserRepository.create(bookxUser);
    return await this.bookxUserRepository.save(newBookxUser);
  }

  getBooksxUser() {
    return this.bookxUserRepository.find({
      relations: ['book'],
    });
  }
}
