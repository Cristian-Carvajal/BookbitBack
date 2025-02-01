import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      clientID: configService.get(process.env.GOOGLE_CLIENT_ID),
      clientSecret: configService.get(process.env.GOOGLE_CLIENT_SECRET),
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { emails, displayName, photos, id } = profile;

    if (!emails || emails.length === 0) {
      return done(
        new UnauthorizedException('No se pudo obtener el correo electrónico'),
        false,
      );
    }

    const email = emails[0].value;
    const user = await this.authService.googleLogin(email);
    if (!user) {
      return done(
        new UnauthorizedException(
          'Usuario no registrado. Debe registrarse primero.',
        ),
        false,
      );
    }

    return done(null, user);
  }
}
