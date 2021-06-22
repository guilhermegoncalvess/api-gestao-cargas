import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Employee from './Employee';
import Load from './Load';
import User from './User';

@Entity('company')
class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  contact: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => User, users => users.company )
  users: User[];

  @OneToMany(() => Employee, employees => employees.company )
  employees: Employee[];

  @OneToMany( () => Load, loads => loads.company )
  loads: Load[];
}

export default Company;
