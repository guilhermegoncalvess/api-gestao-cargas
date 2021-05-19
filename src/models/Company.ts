import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import Person from './Person';

@Entity('company')
class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;
  
  @Column()
  city: string;
  
  @Column()
  state: string;

  @Column()
  contact: string;

  @Column()
  owner_id: string;

  @OneToOne(() => Person)
  @JoinColumn({ name: 'owner_id' })
  owner: Person;
}

export default Company;
