import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import Person from './Person';
import Load from './Load';

@Entity('service')
class Service {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  employee_id: string;

  @OneToMany(() => Person, () => Service)
  @JoinColumn({ name: 'employee_id' })
  employee: Person;

  @Column()
  load_id: string;

  @OneToMany(() => Load, () => Service)
  @JoinColumn({ name: 'load_id' })
  load: Load;
}

export default Service;
