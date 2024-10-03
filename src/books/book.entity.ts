import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'book' })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column()
  pages: number;

  @Column() // esperar para conexión entre tablas
  chapters: number;

  @Column()
  publication_date: string;
}
