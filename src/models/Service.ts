import { Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';

import Employee from './Employee';
import Farm from './Farm';
import Load from './Load';

@Entity('service')
class Service {
  @PrimaryColumn('uuid')
  employee_id: string;

  @PrimaryColumn('uuid')
  farm_id: string;

  @PrimaryColumn('uuid')
  load_id: string;

  @Column()
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Employee, employee => employee.services )
  @JoinColumn({ name: 'employee_id'})
  employees: Employee[];

  @ManyToOne(() => Farm, farm => farm.services)
  @JoinColumn({ name: 'farm_id' })
  farm: Farm;

  @ManyToOne(() => Load)
  @JoinColumn({ name: 'load_id' })
  load: Load;

}

export default Service;
