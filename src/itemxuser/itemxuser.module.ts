import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { itemModule } from '../item/item.module';
import { ItemsXUser } from './itemxuser.entity';
import { ItemsXUserService } from './itemxuser.service';
import { ItemsXUserController } from './itemxuser.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemsXUser]),
    forwardRef(() => itemModule),
    forwardRef(() => UsersModule),
  ],
  providers: [ItemsXUserService],
  controllers: [ItemsXUserController],
  exports: [ItemsXUserService, TypeOrmModule],
})
export class ItemsXUserModule {}
