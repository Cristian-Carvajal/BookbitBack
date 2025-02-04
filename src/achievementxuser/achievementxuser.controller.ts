import { Controller, Get, UseGuards, Req } from '@nestjs/common';
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
    this.achievementXUserService.setAchievements(req.user.id);
    return this.achievementXUserService.getUserAchievements(req.user.id);
  }
}
