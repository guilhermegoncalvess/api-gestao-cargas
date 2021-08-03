import { Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';

import { IsDate, IsEmail, IsUUID, MinLength } from 'class-validator';

import Company from './Company';

@Entity('user')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn()
  @IsUUID("4")
  company_id: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @MinLength(8)
  password: string;

  @Column()
  @IsUUID("4")
  role_id: string;

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

export default User;
