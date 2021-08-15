import { IsDate, IsUUID } from 'class-validator';
import { Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import Employee from './Employee';
import Farm from './Farm';
import Load from './Load';

@Entity('service')
class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn('uuid')
  @IsUUID("4")
  employee_id: string;

  @PrimaryColumn('uuid')
  @IsUUID("4")
  farm_id: string;

  @PrimaryColumn('uuid')
  @IsUUID("4")
  load_id: string;

  @Column()
  @IsDate()
  date: Date;

  @CreateDateColumn()
  @IsDate()
  created_at: Date;

  @UpdateDateColumn()
  @IsDate()
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
