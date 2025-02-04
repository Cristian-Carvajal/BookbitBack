import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from './challenge.entity';
import { ChallengeService } from './challenge.service';
import { ChallengeController } from './challenge.controller';
import { UsersModule } from 'src/users/users.module';
import { StateModule } from 'src/state/state.module';
import { BooksxuserModule } from 'src/booksxuser/booksxuser.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Challenge]),
    forwardRef(() => StateModule),
    forwardRef(() => UsersModule),
    forwardRef(() => BooksxuserModule),
  ],
  controllers: [ChallengeController],
  providers: [ChallengeService],
  exports: [ChallengeService, TypeOrmModule],
})
export class ChallengeModule {}
