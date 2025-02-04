import { Injectable } from '@nestjs/common';
import { GoogleLoginDto } from './dto/google-login.dto';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from 'src/state/state.entity';
import { LessThan, Repository } from 'typeorm';
import { Challenge } from 'src/challenge/challenge.entity';
import { AchievementXUserService } from 'src/achievementxuser/achievementxuser.service';

@Injectable()
export class AuthService {
  private oAuth2Client: OAuth2Client;

  constructor(
    @InjectRepository(State) private stateRepository: Repository<State>,
    @InjectRepository(Challenge)
    private challengeRepository: Repository<Challenge>,
    private userService: UsersService,
    private achievementXUserService: AchievementXUserService,
  ) {
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
      image: payload.picture, // Agregar avatar, si no hay, asignar un valor predeterminado
    };

    // Buscar al usuario en la base de datos
    let user = await this.userService.findByEmail(tokenPayload.email);

    // Si no existe, registrar al nuevo usuario
    if (!user) {
      user = await this.userService.createUser(tokenPayload);
      await this.achievementXUserService.assignAchievementsToUser(user.id);
    }

    await this.updateExpiredChallenges(user.id);
    // Devolver un token JWT para la sesión de la aplicación
    const jwtToken = this.userService.generateJwtToken(user); // Lógica para generar el JWT

    return { token: jwtToken }; // Devuelve el JWT para usar en el frontend
  }

  async updateExpiredChallenges(userId: number) {
    const now = new Date();

    const expiredState = await this.stateRepository.findOne({
      where: { category: 'challenge', name: 'vencido' },
    });

    if (!expiredState) {
      return;
    }

    // Obtener los retos del usuario que ya vencieron y aún están activos
    const expiredChallenges = await this.challengeRepository.find({
      where: {
        user: { id: userId },
        deadLineDate: LessThan(now), // Fecha de vencimiento pasada
        state: { name: 'activo' }, // Estado actual activo
      },
      relations: ['state'],
    });

    if (expiredChallenges.length === 0) {
      return;
    }

    for (const challenge of expiredChallenges) {
      challenge.state = expiredState;
      await this.challengeRepository.save(challenge);
    }
  }
}
