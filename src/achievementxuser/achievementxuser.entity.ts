import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Achievement } from 'src/achievement/achievement.entity';
import { State } from 'src/state/state.entity';

@Entity()
export class AchievementxUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.achievementxUsers)
  user: User;

  @ManyToOne(() => Achievement, (achievement) => achievement)
  achievement: Achievement;

  @CreateDateColumn()
  dateEarned: Date;

  @Column({ default: 0 })
  progress: number;

  @Column({ default: 0 })
  percentage: number;

  @ManyToOne(() => State, { eager: true })
  @JoinColumn({ name: 'state_id' })
  state: State;
}
