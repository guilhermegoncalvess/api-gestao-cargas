import { Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
  OneToOne
} from 'typeorm';

import Company from './Company';
import Service from './Service';

@Entity('employee')
class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn()
  company_id: string;

  @Column()
  name: string;

  @Column()
  nickname: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  contact: string;

  @Column()
  responsibility: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Company, () => Employee)
  @JoinColumn( {name: 'company_id' })
  company: Company;


  @OneToOne( () => Service, service => service.employees )
  services: Service[];

}

export default Employee;
