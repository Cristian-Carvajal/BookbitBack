import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from './shop.entity';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
  ) {}

  async getAllItems() {
    return this.shopRepository.find();
  }

  async findById(id: number) {
    return this.shopRepository.findOne({ where: { id } });
  }

  // async purchaseItem(userId: number, itemId: number): Promise<string> {
  //   const user = await this.userRepository.findOne({ where: { id: userId } });
  //   const item = await this.shopRepository.findOne({ where: { id: itemId } });

  //   if (!user || !item) {
  //     throw new NotFoundException('Usuario o ítem no encontrado.');
  //   }

  //   if (user.coins < item.value) {
  //     throw new ForbiddenException('No tienes suficientes monedas.');
  //   }

  //   user.coins -= item.value; // Descontar monedas
  //   await this.userRepository.save(user);

  //   const newPurchase = this.itemsXUserRepository.create({
  //     user,
  //     item,
  //   });

  //   await this.itemsXUserRepository.save(newPurchase);

  //   return `¡Compra realizada con éxito! Ahora tienes ${user.coins} monedas restantes.`;
  // }
}
