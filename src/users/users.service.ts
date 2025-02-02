import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import * as jwt from 'jsonwebtoken';
import { BookxUserService } from 'src/booksxuser/booksxuser.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly BookxUserService: BookxUserService,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(user: CreateUserDto) {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  generateJwtToken(user: any) {
    const payload = { email: user.email, id: user.id }; // Puedes incluir más datos según lo necesario
    const secretKey = process.env.JWT_SECRET; // Asegúrate de que esta variable esté definida

    if (!secretKey) {
      throw new Error('La clave secreta para el JWT no está definida');
    }

    return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // La clave secreta debe ser utilizada aquí
  }

  getUser(id: number) {
    return this.userRepository.findOne({
      where: {
        //Le paso la columna por la que voy a buscar
        id,
      },
    });
  }

  async getUserProfile(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const library = await this.BookxUserService.getUserBooks(userId);

    if (!user) throw new NotFoundException('Usuario no encontrado');

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      coins: user.coins,
      books: library,
    };
  }
}
