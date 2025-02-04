import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Achievement } from './achievement.entity';
import { AchievementService } from './achievement.service';
import { AchievementController } from './achievement.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Achievement]), UsersModule],
  providers: [AchievementService],
  controllers: [AchievementController],
  exports: [AchievementService, TypeOrmModule],
})
export class AchievementModule {}
