import { Injectable } from '@nestjs/common';
import { GoogleLoginDto } from './dto/google-login.dto';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/createUser.dto';

@Injectable()
export class AuthService {
  private oAuth2Client: OAuth2Client;

  constructor(private userService: UsersService) {
    this.oAuth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async googleLogin(googleLoginDto: GoogleLoginDto) {
    const { token } = googleLoginDto;

    // Verificar el token con Google
    const ticket = await this.oAuth2Client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // Especificar el Client ID
    });
    const payload = ticket.getPayload();

    const tokenPayload: CreateUserDto = {
      email: payload.email,
      name: payload.name,
      avatar: payload.picture || '', // Agregar avatar, si no hay, asignar un valor predeterminado
    };

    // Buscar al usuario en la base de datos
    let user = await this.userService.findByEmail(tokenPayload.email);

    // Si no existe, registrar al nuevo usuario
    if (!user) {
      user = await this.userService.createUser(tokenPayload);
    }

    // Devolver un token JWT para la sesión de la aplicación
    const jwtToken = this.userService.generateJwtToken(user); // Lógica para generar el JWT

    return { token: jwtToken }; // Devuelve el JWT para usar en el frontend
  }
}
