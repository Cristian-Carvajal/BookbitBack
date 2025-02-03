import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Patch,
  Req,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  //El promise se da ya que es asíncrono y lo que esta entre llaves
  //<> es el tipo de dato que espero
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyProfile(@Request() req) {
    return this.userService.getUser(req.user.id);
  }

  @Post()
  createUser(@Body() newUser: CreateUserDto) {
    return this.userService.createUser(newUser);
  }

  // @Put(':id')
  // updateUser(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() user: updateUserDto,
  // ) {
  //   return this.userService.updateUser(id, user);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: ExpressRequest) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async setAvatar(@Req() req, @Param(':id') id: number) {
    return this.userService.setAvatar(req.user.id, id);
  }
}
