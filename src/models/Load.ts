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
import Farm from './Farm';

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
}

export default Load;
