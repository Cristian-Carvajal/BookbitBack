import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookxUser } from './booksxuser.entity';
import { BookxUserService } from './booksxuser.service';
import { BookxUserController } from './booksxuser.controller';
import { BooksModule } from 'src/books/books.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([BookxUser]), BooksModule, UsersModule],
  providers: [BookxUserService],
  controllers: [BookxUserController],
})
export class BooksxuserModule {}
