import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Challenge } from 'src/challenge/challenge.entity';
import { User } from 'src/users/user.entity';
import { State } from 'src/state/state.entity';

@Entity({ name: 'challengexuser' })
export class ChallengeXUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.challengeXUser, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Challenge, (challenge) => challenge.challengeXUsers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'challenge_id' })
  challenge: Challenge;

  @ManyToOne(() => State, { eager: true })
  @JoinColumn({ name: 'state_id' }) // Relación con `state`
  state: State;

  @Column({ type: 'date', nullable: true })
  completion_date: Date; // Fecha de finalización (si se completa)
}
