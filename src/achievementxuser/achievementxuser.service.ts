import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Achievement } from 'src/achievement/achievement.entity';
import { AchievementxUser } from './achievementxuser.entity';
import { State } from 'src/state/state.entity';

@Injectable()
export class AchievementXUserService {
  constructor(
    @InjectRepository(AchievementxUser)
    private readonly achievementXUserRepository: Repository<AchievementxUser>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Achievement)
    private readonly achievementRepository: Repository<Achievement>,
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
  ) {}

  // 📌 Obtener logros obtenidos por un usuario
  async getUserAchievements(userId: number): Promise<AchievementxUser[]> {
    return this.achievementXUserRepository.find({
      where: { user: { id: userId } },
      relations: ['achievement', 'achivement.category'],
    });
  }

  // 📌 Asignar un logro a un usuario
  async assignAchievementsToUser(userId: number): Promise<AchievementxUser> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const achievements = await this.achievementRepository.find();

    if (!user || !achievements) {
      throw new NotFoundException('Usuario o logro no encontrado');
    }

    const assignedAchievement = await this.stateRepository.findOne({
      where: { category: 'achievement', name: 'en proceso' },
    });
    for (const achievement of achievements) {
      const userAchievement = this.achievementXUserRepository.create({
        user,
        achievement,
      });
      await this.achievementXUserRepository.save(userAchievement);
    }
    for (const achievement of achievements) {
      this.achievementXUserRepository.update(
        { user: { id: user.id }, achievement: { id: achievement.id } }, // Condición para encontrar el registro
        { state: assignedAchievement },
      );
    }
    return;
  }

  async setAchievements(userId: number): Promise<AchievementxUser> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const achievements = await this.achievementXUserRepository.find();

    if (!user || !achievements) {
      throw new NotFoundException('Usuario o logro no encontrado');
    }

    for (const achievement of achievements) {
      if (
        (achievement.progress / achievement.achievement.condition) * 100 >
        100
      ) {
        this.achievementXUserRepository.update(
          { user: { id: user.id }, achievement: { id: achievement.id } }, // Condición para encontrar el registro
          { percentage: 100 },
        );
        const completedAchievement = await this.stateRepository.findOne({
          where: { category: 'achievement', name: 'conseguido' },
        });
        this.achievementXUserRepository.update(
          { user: { id: user.id }, achievement: { id: achievement.id } }, // Condición para encontrar el registro
          { state: completedAchievement },
        );
      } else {
        const percentage =
          (achievement.progress / achievement.achievement.condition) * 100;
        this.achievementXUserRepository.update(
          { user: { id: user.id }, achievement: { id: achievement.id } }, // Condición para encontrar el registro
          { percentage: percentage },
        );
      }
    }

    return;
  }
}
