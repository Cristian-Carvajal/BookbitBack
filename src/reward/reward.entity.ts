import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('reward')
export class Reward {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  imageUrl: string;
}
