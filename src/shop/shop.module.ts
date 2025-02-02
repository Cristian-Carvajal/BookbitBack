import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { Shop } from './shop.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Shop]), UsersModule],
  providers: [ShopService],
  controllers: [ShopController],
  exports: [ShopService, TypeOrmModule],
})
export class ShopModule {}
