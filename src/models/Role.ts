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
  company_id: string;

  @Column()
  name: string;

  @Column({ type: 'jsonb'})
  permission: any;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Company, company => company.users)
  @JoinColumn({ name: 'company_id'})
  company: Company;
}

export default Role;
