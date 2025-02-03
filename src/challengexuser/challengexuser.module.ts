import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengeXUser } from './challengexuser.entity';
import { ChallengeXUserService } from './challengexuser.service';
import { ChallengeXUserController } from './challengexuser.controller';
import { Challenge } from '../challenge/challenge.entity';
import { UsersModule } from 'src/users/users.module';
import { StateModule } from 'src/state/state.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChallengeXUser, Challenge]),
    UsersModule,
    StateModule,
  ],
  controllers: [ChallengeXUserController],
  providers: [ChallengeXUserService],
  exports: [ChallengeXUserService],
})
export class ChallengeXUserModule {}
