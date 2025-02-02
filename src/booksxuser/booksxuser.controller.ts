import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BookxUserService } from './booksxuser.service';

@UseGuards(JwtAuthGuard) // 🔒 Solo usuarios autenticados pueden acceder
@Controller('user-books')
export class BookxUserController {
  constructor(private readonly bookxUserService: BookxUserService) {}

  @Post(':userId/:bookId')
  async addBookToUser(
    @Param('userId') userId: number,
    @Param('bookId') bookId: number,
  ) {
    return this.bookxUserService.addBookToUser(+userId, +bookId);
  }

  @Delete(':userId/:bookId')
  async removeBookFromUser(
    @Param('userId') userId: number,
    @Param('bookId') bookId: number,
  ) {
    return this.bookxUserService.removeBookFromUser(+userId, +bookId);
  }

  @Get()
  async getUserBooks(@Request() req) {
    return this.bookxUserService.getUserBooks(req.user.id);
  }
}
