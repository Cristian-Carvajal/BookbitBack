import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { itemService } from './item.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('item')
export class itemController {
  constructor(private readonly itemService: itemService) {}

  @Get()
  async getAllItems(@Req() req) {
    return this.itemService.getAvailableItems(req.user.id);
  }
}
