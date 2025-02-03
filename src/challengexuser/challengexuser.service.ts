import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChallengeXUser } from './challengexuser.entity';
import { Challenge } from '../challenge/challenge.entity';
import { User } from '../users/user.entity';
import { State } from 'src/state/state.entity';

@Injectable()
export class ChallengeXUserService {
  constructor(
    @InjectRepository(ChallengeXUser)
    private readonly challengeXUserRepository: Repository<ChallengeXUser>,
    @InjectRepository(Challenge)
    private readonly challengeRepository: Repository<Challenge>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
  ) {}

  async assignChallengeToUser(
    userId: number,
    challengeId: number,
    stateId: number,
  ): Promise<ChallengeXUser> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const challenge = await this.challengeRepository.findOne({
      where: { id: challengeId },
    });
    const state = await this.stateRepository.findOne({
      where: { id: stateId },
    });

    if (!user || !challenge || !state) {
      throw new Error('User, Challenge, or Status not found');
    }

    const challengeXUser = new ChallengeXUser();
    challengeXUser.user = user;
    challengeXUser.challenge = challenge;
    challengeXUser.state = state;
    challengeXUser.completion_date = null;

    return this.challengeXUserRepository.save(challengeXUser);
  }

  async getUserChallenges(userId: number): Promise<ChallengeXUser[]> {
    return this.challengeXUserRepository.find({
      where: { user: { id: userId } },
      relations: ['challenge', 'state'],
    });
  }

  async completeChallenge(
    userId: number,
    challengeId: number,
  ): Promise<ChallengeXUser> {
    const challengeXUser = await this.challengeXUserRepository.findOne({
      where: { user: { id: userId }, challenge: { id: challengeId } },
    });

    if (!challengeXUser) {
      throw new Error('Reto no encontrado.');
    }

    const completedState = await this.stateRepository.findOne({
      where: { category: 'challenge', name: 'completado' },
    });

    if (!completedState) {
      throw new Error('Estado "completado" no encontrado.');
    }

    challengeXUser.state = completedState;
    challengeXUser.completion_date = new Date();

    return this.challengeXUserRepository.save(challengeXUser);
  }
}
