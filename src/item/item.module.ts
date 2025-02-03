/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { itemService } from './item.service';
import { itemController } from './item.controller';
import { item } from './item.entity';
import { UsersModule } from 'src/users/users.module';
import { ItemsXUserModule } from 'src/itemxuser/itemxuser.module';

@Module({
  imports: [TypeOrmModule.forFeature([item]), forwardRef(() => UsersModule), forwardRef(() => ItemsXUserModule)],
  providers: [itemService],
  controllers: [itemController],
  exports: [itemService, TypeOrmModule],
})
export class itemModule {}
