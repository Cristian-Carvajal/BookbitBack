import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('state')
@Index(['category', 'name'], { unique: true })
export class State {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: string;
}
