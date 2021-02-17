import { Entity, OneToMany, JoinColumn, PrimaryColumn } from 'typeorm';
import Person from './Person';
import Load from './Load';

@Entity('service')
class Service {
  @PrimaryColumn()
  employee_id: string;

  @OneToMany(() => Person, () => Service)
  @JoinColumn({ name: 'employee_id' })
  employee: Person;

  @PrimaryColumn()
  load_id: string;

  @OneToMany(() => Load, () => Service)
  @JoinColumn({ name: 'load_id' })
  load: Load;
}

export default Service;
