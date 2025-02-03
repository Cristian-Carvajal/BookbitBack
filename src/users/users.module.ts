import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { BooksxuserModule } from 'src/booksxuser/booksxuser.module';
import { StateModule } from 'src/state/state.module';

@Module({
  //forFeature me indica que entidades puede cargar
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => BooksxuserModule),
    StateModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
