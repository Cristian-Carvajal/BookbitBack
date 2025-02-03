import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookxUser } from './booksxuser.entity';
import { BookxUserService } from './booksxuser.service';
import { BookxUserController } from './booksxuser.controller';
import { BooksModule } from 'src/books/books.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookxUser]),
    forwardRef(() => UsersModule),
    forwardRef(() => BooksModule),
  ],
  providers: [BookxUserService],
  controllers: [BookxUserController],
  exports: [BookxUserService, TypeOrmModule],
})
export class BooksxuserModule {}
