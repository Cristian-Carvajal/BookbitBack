import { ChallengeXUser } from 'src/challengexuser/challengexuser.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'challenge' })
export class Challenge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'int' })
  pages: number; // Cantidad de páginas a leer

  @Column({ type: 'int' })
  deadline: number; // Tiempo límite en días

  @Column({ type: 'int' })
  reward: number; // Monedas otorgadas

  @OneToMany(() => ChallengeXUser, (challengeXUser) => challengeXUser.challenge)
  challengeXUsers: ChallengeXUser[];
}
