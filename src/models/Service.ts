import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import Person from './Person';
import Load from './Load';

@Entity('service')
class Service {
  @PrimaryColumn()
  employee_id: string;

  @ManyToOne(() => Person)
  @JoinColumn({ name: 'employee_id' })
  employee: Person;

  @PrimaryColumn()
  load_id: string;

  @ManyToOne(() => Load)
  @JoinColumn({ name: 'load_id' })
  load: Load;
}

export default Service;
