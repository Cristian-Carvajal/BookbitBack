import { Achievement } from 'src/achievement/achievement.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class AchievementCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Achievement, (achievements) => achievements.category)
  achievements: Achievement[];
}
