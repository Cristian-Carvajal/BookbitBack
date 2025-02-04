import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Challenge } from './challenge.entity';
import { User } from 'src/users/user.entity';
import { State } from 'src/state/state.entity';
import { BookxUser } from 'src/booksxuser/booksxuser.entity';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectRepository(Challenge)
    private readonly challengeRepository: Repository<Challenge>,
    @InjectRepository(BookxUser)
    private readonly bookxUserRepository: Repository<BookxUser>,
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
    bookId: number,
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
    challenge.pages = pages;
    challenge.reward = this.calculateReward(pages, deadLine);
    challenge.user = user;
    challenge.bookId = bookId;
    challenge.state = defaultState;
    challenge.completion_date = null;
    challenge.startDate = new Date();
    challenge.deadLineDate = new Date(challenge.startDate);
    challenge.deadLineDate.setDate(challenge.startDate.getDate() + deadLine);

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
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const challenge = await this.challengeRepository.findOne({
      where: { id: challengeId, user: { id: userId } },
    });
    const bookId = challenge.bookId;
    const bookxuser = await this.bookxUserRepository.findOne({
      where: { book: { id: bookId }, user: { id: userId } },
    });

    if (!bookxuser) {
      throw new NotFoundException('El libro no esta en su biblioteca');
    }

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (!challenge) {
      throw new Error('Reto no encontrado.');
    }

    const completedState = await this.stateRepository.findOne({
      where: { category: 'challenge', name: 'completado' },
    });

    if (!completedState) {
      throw new Error('Estado "completado" no encontrado.');
    }

    if (challenge.state.name == 'completado') {
      throw new Error('Logro ya completado');
    }

    if (challenge.state.name == 'vencido') {
      throw new Error('Logro ya se ha vencido');
    }

    user.coins += challenge.reward;

    bookxuser.bookPercentaje += (challenge.pages / bookxuser.book.pages) * 100;

    if (bookxuser.bookPercentaje > 100) {
      bookxuser.bookPercentaje = 100;
    }

    challenge.state = completedState;
    challenge.completion_date = new Date();

    this.bookxUserRepository.save(bookxuser);
    this.userRepository.save(user);

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

    const logFactor = Math.log2(pages + 1) / 3; // 🔹 Reduce aún más el impacto del logaritmo
    const baseReward = logFactor * (pages / (deadLine * 3)) * 3; // 🔹 Menor multiplicador final y mayor divisor

    return Math.max(Math.floor(baseReward), 1);
  }
}
