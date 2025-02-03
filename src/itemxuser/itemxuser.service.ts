import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemsXUser } from './itemxuser.entity';
import { User } from 'src/users/user.entity';
import { item } from 'src/item/item.entity';

@Injectable()
export class ItemsXUserService {
  constructor(
    @InjectRepository(ItemsXUser)
    private readonly itemsXUserRepository: Repository<ItemsXUser>,

    @InjectRepository(item)
    private readonly itemRepository: Repository<item>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async buyItem(userId: number, itemId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const item = await this.itemRepository.findOne({ where: { id: itemId } });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    if (!item) {
      throw new NotFoundException('Item no encontrado');
    }

    if (user.coins < item.value) {
      throw new NotFoundException('No tienes suficientes monedas');
    }

    // Restar monedas y guardar la compra
    user.coins -= item.value;
    await this.userRepository.save(user);

    const newItem = this.itemsXUserRepository.create({
      user,
      item,
    });

    return this.itemsXUserRepository.save(newItem);
  }

  async getUserItems(userId: number) {
    return this.itemsXUserRepository.find({
      where: { user: { id: userId } },
      relations: ['item'],
    });
  }
}
