import { Contains, IsDate, IsIn, IsNumber, IsString, IsUUID, MinLength } from 'class-validator';
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
  @IsUUID("4")
  company_id: string;

  @Column()
  @IsNumber()
  weight: number;

  @Column()
  @IsNumber()
  cost: number;

  @Column()
  @IsString()
  type: string;

  @Column()
  @IsString()
  @MinLength(10)
  description: string;

  @Column()
  @IsString()
  @IsIn(["open", "execution", "concluded"])
  status: string;

  @Column()
  @IsDate()
  start_date: Date;

  @Column()
  @IsDate()
  finished_date: Date;

  @CreateDateColumn()
  @IsDate()
  created_at: Date;

  @UpdateDateColumn()
  @IsDate()
  updated_at: Date;

  @ManyToOne(() => Company, () => Load )
  @JoinColumn({ name: 'company_id'})
  company: Company;

}

export default Load;
