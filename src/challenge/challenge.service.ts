import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Challenge } from './challenge.entity';
import { User } from 'src/users/user.entity';
import { State } from 'src/state/state.entity';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectRepository(Challenge)
    private readonly challengeRepository: Repository<Challenge>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
  ) {}

  async createChallenge(
    userId: number,
    name: string,
    pages: number,
    deadLine: number,
  ): Promise<Challenge> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const defaultState = await this.stateRepository.findOne({
      where: { category: 'challenge', name: 'activo' },
    });

    if (!defaultState) {
      throw new NotFoundException('Estado "activo" no encontrado');
    }

    const challenge = new Challenge();
    challenge.name = name;
    challenge.deadLine = deadLine;
    challenge.reward = this.calculateReward(pages, deadLine);
    challenge.user = user;
    challenge.state = defaultState;
    challenge.completion_date = null;

    return this.challengeRepository.save(challenge);
  }

  async getUserChallenges(userId: number): Promise<Challenge[]> {
    return this.challengeRepository.find({
      where: { user: { id: userId } },
      relations: ['state'],
    });
  }

  async completeChallenge(
    userId: number,
    challengeId: number,
  ): Promise<Challenge> {
    const challenge = await this.challengeRepository.findOne({
      where: { id: challengeId, user: { id: userId } },
    });

    if (!challenge) {
      throw new Error('Reto no encontrado.');
    }

    const completedState = await this.stateRepository.findOne({
      where: { category: 'challenge', name: 'completado' },
    });

    if (!completedState) {
      throw new Error('Estado "completado" no encontrado.');
    }

    challenge.state = completedState;
    challenge.completion_date = new Date();

    return this.challengeRepository.save(challenge);
  }

  async getChallengeById(id: number): Promise<Challenge> {
    return this.challengeRepository.findOne({
      where: { id },
      relations: ['user', 'state'],
    });
  }

  private calculateReward(pages: number, deadLine: number): number {
    if (deadLine <= 0) return 0;
    const logFactor = Math.log2(pages + 1);
    const baseReward = logFactor * (pages / deadLine) * 10;
    return Math.max(Math.floor(baseReward), 1);
  }
}
