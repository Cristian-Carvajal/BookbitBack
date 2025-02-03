import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Achievement } from './achievement.entity';

@Injectable()
export class AchievementService {
  constructor(
    @InjectRepository(Achievement)
    private readonly achievementRepository: Repository<Achievement>,
  ) {}

  // 📌 Obtener todos los logros disponibles
  async getAllAchievements(): Promise<Achievement[]> {
    return this.achievementRepository.find();
  }

  // 📌 Obtener un logro por ID
  async getAchievementById(id: number): Promise<Achievement> {
    const achievement = await this.achievementRepository.findOne({
      where: { id },
    });
    if (!achievement) {
      throw new NotFoundException('Logro no encontrado');
    }
    return achievement;
  }
}
