import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('person')
class Person {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  nickname: string;

  @Column()
  address: string;

  @Column()
  contact: string;

  @Column()
  role: 'Motorista' | 'Embalador' | 'Propietario';
}

export default Person;
