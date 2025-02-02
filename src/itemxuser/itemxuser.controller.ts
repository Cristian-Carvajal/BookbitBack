import {
  Controller,
  Post,
  Get,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ItemsXUserService } from './itemxuser.service';

@UseGuards(JwtAuthGuard)
@Controller('inventory')
export class ItemsXUserController {
  constructor(private readonly itemsXUserService: ItemsXUserService) {}

  @Post('buy/:itemId')
  async buyItem(@Request() req, @Param('itemId') itemId: number) {
    return this.itemsXUserService.buyItem(req.user.id, itemId);
  }

  @Get()
  async getUserItems(@Request() req) {
    return this.itemsXUserService.getUserItems(req.user.id);
  }
}
