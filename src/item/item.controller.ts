import { Controller, Get } from '@nestjs/common';
import { itemService } from './item.service';

@Controller('item')
export class itemController {
  constructor(private readonly itemService: itemService) {}

  @Get()
  async getAllItems() {
    return this.itemService.getAllItems();
  }
}
