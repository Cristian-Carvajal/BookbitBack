import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('state')
export class State {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: string;
}
