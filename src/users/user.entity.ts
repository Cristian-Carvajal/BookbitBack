import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  birth_date: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column() // esperar para conexión entre tablas
  id_status: number;

  @Column({ default: 0 })
  coins: number;
}
