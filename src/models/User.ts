import { Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn
} from 'typeorm';

import Company from './Company';

@Entity('user')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn()
  company_id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Company, company => company.users)
  @JoinColumn({ name: 'company_id'})
  company: Company;
}

export default User;
