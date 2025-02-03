import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AchievementxUser } from './achievementxuser.entity';
import { AchievementXUserService } from './achievementxuser.service';

@UseGuards(JwtAuthGuard)
@Controller('user-achievements')
export class AchievementXUserController {
  constructor(
    private readonly achievementXUserService: AchievementXUserService,
  ) {}

  // 📌 Obtener los logros de un usuario
  @Get()
  async getUserAchievements(@Req() req): Promise<AchievementxUser[]> {
    return this.achievementXUserService.getUserAchievements(req.user.id);
  }

  // 📌 Asignar un logro a un usuario
  @Post(':userId/:achievementId')
  async assignAchievement(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('achievementId', ParseIntPipe) achievementId: number,
  ): Promise<AchievementxUser> {
    return this.achievementXUserService.assignAchievementToUser(
      userId,
      achievementId,
    );
  }
}
