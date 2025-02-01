import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { updateUserDto } from './dto/updateUser.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(user: CreateUserDto) {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  generateJwtToken(user: User): string {
    return jwt.sign(
      { id: user.id, email: user.email },
      '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',
      {
        expiresIn: '1h',
      },
    );
  }

  getUsers() {
    return this.userRepository.find();
  }

  getUser(id: number) {
    return this.userRepository.findOne({
      where: {
        //Le paso la columna por la que voy a buscar
        id,
      },
    });
  }

  updateUser(id: number, user: updateUserDto) {
    return this.userRepository.update(id, user);
  }

  async getUserProfile(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) throw new NotFoundException('Usuario no encontrado');

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      coins: user.coins,
    };
  }
}
