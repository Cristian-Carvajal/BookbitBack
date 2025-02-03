import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from './challenge.entity';
import { ChallengeService } from './challenge.service';
import { ChallengeController } from './challenge.controller';
import { UsersModule } from 'src/users/users.module';
import { StateModule } from 'src/state/state.module';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge]), UsersModule, StateModule],
  controllers: [ChallengeController],
  providers: [ChallengeService],
  exports: [ChallengeService],
})
export class ChallengeModule {}
