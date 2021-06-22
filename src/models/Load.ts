import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

import Company from './Company';

@Entity('load')
class Load {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn()
  company_id: string;

  @Column()
  weight: number;

  @Column()
  cost: number;

  @Column()
  type: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column()
  start_date: Date;

  @Column()
  finished_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Company, () => Load )
  @JoinColumn({ name: 'company_id'})
  company: Company;

}

export default Load;
