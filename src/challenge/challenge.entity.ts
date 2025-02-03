import { State } from 'src/state/state.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'challenge' })
export class Challenge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.challenge, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' }) // Define la clave foránea explícitamente
  user: User;

  @ManyToOne(() => State, { eager: true })
  @JoinColumn({ name: 'state_id' }) // Relación con `state`
  state: State;

  @Column({ type: 'int' })
  pages: number; // Cantidad de páginas a leer

  @Column({ type: 'int' })
  deadline: number; // Tiempo límite en días

  @Column({ type: 'int' })
  reward: number; // Monedas otorgadas

  @Column({ type: 'date', nullable: true })
  completion_date: Date; // Fecha de finalización (si se completa)
}
