import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleLoginDto } from './dto/google-login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  usersService: any;
  constructor(private readonly authService: AuthService) {}

  @Post('google-login')
  async googleLogin(@Body() googleLoginDto: GoogleLoginDto) {
    return await this.authService.googleLogin(googleLoginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    const userId = req.user.id; // ID del usuario autenticado extraído del token
    const user = await this.usersService.findUserById(userId);

    if (!user) {
      return { message: 'Usuario no encontrado' };
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      coins: user.coins, // Asegúrate de que la base de datos tiene este campo
      avatar: user.avatar,
    };
  }
}
