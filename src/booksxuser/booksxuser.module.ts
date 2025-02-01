import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookxUser } from './booksxuser.entity';
import { BooksxuserService } from './booksxuser.service';
import { BooksxuserController } from './booksxuser.controller';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [TypeOrmModule.forFeature([BookxUser]), BooksModule],
  providers: [BooksxuserService],
  controllers: [BooksxuserController],
})
export class BooksxuserModule {}
