import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopModule } from '../shop/shop.module';
import { ItemsXUser } from './itemxuser.entity';
import { ItemsXUserService } from './itemxuser.service';
import { ItemsXUserController } from './itemxuser.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([ItemsXUser]), ShopModule, UsersModule],
  providers: [ItemsXUserService],
  controllers: [ItemsXUserController],
  exports: [ItemsXUserService],
})
export class ItemsXUserModule {}
