import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Achievement } from './achievement.entity';
import { AchievementService } from './achievement.service';
import { AchievementController } from './achievement.controller';
import { StateModule } from 'src/state/state.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Achievement]),
    forwardRef(() => UsersModule),
    forwardRef(() => StateModule),
  ],
  providers: [AchievementService],
  controllers: [AchievementController],
  exports: [AchievementService, TypeOrmModule],
})
export class AchievementModule {}
