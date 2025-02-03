import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { Achievement } from './achievement.entity';

@Controller('achievements')
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  // 📌 Obtener todos los logros
  @Get()
  async getAllAchievements(): Promise<Achievement[]> {
    return this.achievementService.getAllAchievements();
  }

  // 📌 Obtener un logro por ID
  @Get(':id')
  async getAchievementById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Achievement> {
    return this.achievementService.getAchievementById(id);
  }
}
