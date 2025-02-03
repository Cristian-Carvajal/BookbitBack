import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import * as jwt from 'jsonwebtoken';
import { BookxUserService } from 'src/booksxuser/booksxuser.service';
import { State } from 'src/state/state.entity';
import { ItemsXUser } from 'src/itemxuser/itemxuser.entity';

@Injectable()
export class UsersService {
  itemRepository: any;
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(State) private stateRepository: Repository<State>,
    @InjectRepository(ItemsXUser)
    private readonly itemsXUserRepository: Repository<ItemsXUser>,
    private readonly BookxUserService: BookxUserService,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(user: CreateUserDto) {
    user.state = await this.stateRepository.findOne({
      where: { category: 'user', name: 'activo' },
    });
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

  async setAvatar(userId: number, itemId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('Usuario no encontrado.');
    }

    const avatar = await this.itemRepository.findOne({
      where: { id: itemId },
    });

    if (!avatar) {
      throw new Error('avatar no encontrado.');
    }

    user.currentAvatar = avatar.image;

    return this.userRepository.save(user);
  }
}
