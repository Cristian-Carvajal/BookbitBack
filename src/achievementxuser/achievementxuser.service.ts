import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Achievement } from 'src/achievement/achievement.entity';
import { AchievementxUser } from './achievementxuser.entity';

@Injectable()
export class AchievementXUserService {
  constructor(
    @InjectRepository(AchievementxUser)
    private readonly achievementXUserRepository: Repository<AchievementxUser>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Achievement)
    private readonly achievementRepository: Repository<Achievement>,
  ) {}

  // 📌 Obtener logros obtenidos por un usuario
  async getUserAchievements(userId: number): Promise<AchievementxUser[]> {
    return this.achievementXUserRepository.find({
      where: { user: { id: userId } },
      relations: ['achievement'],
    });
  }

  // 📌 Asignar un logro a un usuario
  async assignAchievementToUser(
    userId: number,
    achievementId: number,
  ): Promise<AchievementxUser> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const achievement = await this.achievementRepository.findOne({
      where: { id: achievementId },
    });

    if (!user || !achievement) {
      throw new NotFoundException('Usuario o logro no encontrado');
    }

    // Verificar si el usuario ya tiene este logro
    const existingAchievement = await this.achievementXUserRepository.findOne({
      where: { user: { id: userId }, achievement: { id: achievementId } },
    });

    if (existingAchievement) {
      return existingAchievement; // No lo volvemos a asignar
    }

    const userAchievement = this.achievementXUserRepository.create({
      user,
      achievement,
    });
    return this.achievementXUserRepository.save(userAchievement);
  }
}
