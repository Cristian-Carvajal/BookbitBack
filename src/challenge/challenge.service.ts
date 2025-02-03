import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Challenge } from './challenge.entity';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectRepository(Challenge)
    private readonly challengeRepository: Repository<Challenge>,
  ) {}

  async createChallenge(
    name: string,
    pages: number,
    deadline: number,
  ): Promise<Challenge> {
    const challenge = new Challenge();
    challenge.name = name;
    challenge.deadline = deadline;
    challenge.reward = this.calculateReward(pages, deadline);

    return this.challengeRepository.save(challenge);
  }

  async getChallengeById(id: number): Promise<Challenge> {
    return this.challengeRepository.findOne({ where: { id } });
  }

  private calculateReward(pages: number, deadline: number): number {
    if (deadline <= 0) return 0;
    const logFactor = Math.log2(pages + 1);
    const baseReward = logFactor * (pages / deadline) * 10;
    return Math.max(Math.floor(baseReward), 1);
  }
}
