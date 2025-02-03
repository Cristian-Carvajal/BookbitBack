import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { item } from './item.entity';
import { ItemsXUserService } from 'src/itemxuser/itemxuser.service';

@Injectable()
export class itemService {
  constructor(
    @InjectRepository(item)
    private itemRepository: Repository<item>,
    private readonly itemsXUserService: ItemsXUserService,
  ) {}

  async getAvailableItems(userId: number) {
    const allItems = await this.getAllItems();
    const userItems = await this.itemsXUserService.getUserItems(userId);

    const itemsAvailable = allItems.filter(
      (item) => !userItems.some((userItems) => userItems.id === item.id),
    );

    return itemsAvailable;
  }

  async getAllItems() {
    return this.itemRepository.find();
  }

  async findById(id: number) {
    return this.itemRepository.findOne({ where: { id } });
  }
}
