import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import Person from './Person';

@Entity('farm')
class Farm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  owner_id: string;

  @OneToOne(() => Person)
  @JoinColumn({ name: 'owner_id' })
  owner: Person;
}

export default Farm;
