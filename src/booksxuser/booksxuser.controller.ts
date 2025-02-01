import { Body, Controller, Get, Post } from '@nestjs/common';
import { createBookxUserDto } from './dto/createBookxUserDto.dto';
import { BooksxuserService } from './booksxuser.service';

@Controller('booksxuser')
export class BooksxuserController {
  constructor(private bookxUserService: BooksxuserService) {}

  @Post()
  createBookxUser(@Body() bookxuser: createBookxUserDto) {
    return this.bookxUserService.createBookxUser(bookxuser);
  }

  @Get()
  getBookxUser() {
    return this.bookxUserService.getBooksxUser();
  }
}
