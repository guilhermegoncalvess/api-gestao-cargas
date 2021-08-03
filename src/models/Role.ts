import { IsDate, IsJSON, IsUUID, MinLength, minLength } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn
} from 'typeorm';

import Company from './Company';

@Entity('role')
class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn()
  @IsUUID("4")
  company_id: string;

  @Column()
  @MinLength(1)
  name: string;

  @Column({ type: 'jsonb'})
  @IsJSON()
  permission: any;

  @CreateDateColumn()
  @IsDate()
  created_at: Date;

  @UpdateDateColumn()
  @IsDate()
  updated_at: Date;

  @ManyToOne(() => Company, company => company.users)
  @JoinColumn({ name: 'company_id'})
  company: Company;
}

export default Role;
