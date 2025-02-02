import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { BooksxuserModule } from './booksxuser/booksxuser.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ShopService } from './shop/shop.service';
import { ShopController } from './shop/shop.controller';
import { ShopModule } from './shop/shop.module';
import { ItemsXUserService } from './itemxuser/itemxuser.service';
import { ItemsXUserController } from './itemxuser/itemxuser.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_host,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_user,
      password: process.env.DB_password,
      database: process.env.DB_name, //Este es el nombre de la base de datos que debo crear
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
      extra: {
        connectTimeout: 10000,
        ssl: false,
      },
    }),
    UsersModule,
    BooksModule,
    BooksxuserModule,
    AuthModule,
    ShopModule,
    UsersModule,
  ],
  controllers: [AppController, ShopController, ItemsXUserController],
  providers: [AppService, ShopService, ItemsXUserService],
})
export class AppModule {}
