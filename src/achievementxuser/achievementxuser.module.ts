import { forwardRef, Module } from '@nestjs/common';
import { AchievementXUserService } from './achievementxuser.service';
import { AchievementXUserController } from './achievementxuser.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchievementxUser } from './achievementxuser.entity';
import { UsersModule } from 'src/users/users.module';
import { AchievementModule } from 'src/achievement/achievement.module';
import { BooksxuserModule } from 'src/booksxuser/booksxuser.module';
import { StateModule } from 'src/state/state.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AchievementxUser]),
    forwardRef(() => BooksxuserModule),
    forwardRef(() => UsersModule),
    forwardRef(() => AchievementModule),
    forwardRef(() => StateModule),
  ],
  providers: [AchievementXUserService],
  controllers: [AchievementXUserController],
  exports: [AchievementXUserService, TypeOrmModule],
})
export class AchievementxuserModule {}
