import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { item } from './item.entity';

@Injectable()
export class itemService {
  constructor(
    @InjectRepository(item)
    private itemRepository: Repository<item>,
  ) {}

  async getAllItems() {
    return this.itemRepository.find();
  }

  async findById(id: number) {
    return this.itemRepository.findOne({ where: { id } });
  }
}
