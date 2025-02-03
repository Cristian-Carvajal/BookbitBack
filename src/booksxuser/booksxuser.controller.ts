import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BookxUserService } from './booksxuser.service';

@UseGuards(JwtAuthGuard) // 🔒 Solo usuarios autenticados pueden acceder
@Controller('user-books')
export class BookxUserController {
  constructor(private readonly bookxUserService: BookxUserService) {}

  @Post(':bookId')
  async addBookToUser(@Req() req, @Param('bookId') bookId: number) {
    return this.bookxUserService.addBookToUser(req.user.id, +bookId);
  }

  @Delete(':bookId')
  async removeBookFromUser(@Request() req, @Param('bookId') bookId: number) {
    return this.bookxUserService.removeBookFromUser(req.user.id, +bookId);
  }

  @Get('toAdd')
  async getBookToAdd(@Request() req) {
    return this.bookxUserService.getBooksToAdd(req.user.id);
  }

  @Get()
  async getUserBooks(@Request() req) {
    return this.bookxUserService.getUserBooks(req.user.id);
  }
}
