import { AchievementCategory } from 'src/achievementCategory/achievementCategory.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Achievement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => AchievementCategory, (category) => category.achievements, {
    eager: true,
  }) // Prueba con { eager: true }
  category: AchievementCategory;

  @Column()
  condition: number; // Condición para obtener el logro (puede ser JSON o un string con reglas)
}
