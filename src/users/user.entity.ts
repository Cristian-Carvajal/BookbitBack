import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column({ nullable: true }) // esperar para conexión entre tablas
  id_status: number;

  @Column({ default: 0 })
  coins: number;

  @Column({ nullable: true, length: 500 })
  avatar: string;
}
