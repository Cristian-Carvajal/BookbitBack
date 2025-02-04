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
  async assignAchievementsToUser(userId: number): Promise<AchievementxUser> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const achievements = await this.achievementRepository.find();

    if (!user || !achievements) {
      throw new NotFoundException('Usuario o logro no encontrado');
    }

    for (const achievement of achievements) {
      const userAchievement = this.achievementXUserRepository.create({
        user,
        achievement,
      });
      await this.achievementXUserRepository.save(userAchievement);
    }
    return;
  }
}
