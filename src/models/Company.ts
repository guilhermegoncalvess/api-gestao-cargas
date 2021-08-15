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
import Role from './Role';
import { IsDate, IsIn, IsString, Length } from 'class-validator';

@Entity('company')
class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @Length(1, 30)
  name: string;

  @Column()
  @IsString()
  cnpj: string;

  @Column()
  @IsString()
  @Length(1, 30)
  address: string;

  @Column()
  @IsString()
  @Length(1, 30)
  city: string;

  @Column()
  @IsString()
  @Length(1, 30)
  state: string;

  @Column()
  @IsString()
  @Length(1, 30)
  contact: string;

  @Column()
  @IsString()
  @IsIn(['penind', 'accepted'])
  status: string;

  @CreateDateColumn()
  @IsDate()
  created_at: Date;

  @UpdateDateColumn()
  @IsDate()
  updated_at: Date;

  @OneToMany(() => User, users => users.company )
  users: User[];

  @OneToMany(() => Role, role => role.company )
  roles: Role[];

  @OneToMany(() => Employee, employees => employees.company )
  employees: Employee[];

  @OneToMany( () => Load, loads => loads.company )
  loads: Load[];
}

export default Company;
