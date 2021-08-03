import { IsDate, IsString, IsUUID, Length } from 'class-validator';
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
  @IsUUID("4")
  company_id: string;

  @Column()
  @IsString()
  @Length(1, 30)
  name: string;

  @Column()
  @IsString()
  @Length(1, 30)
  nickname: string;

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
  contact: string;

  @Column()
  @IsString()
  @Length(1, 30)
  responsibility: string;

  @CreateDateColumn()
  @IsDate()
  created_at: Date;

  @UpdateDateColumn()
  @IsDate()
  updated_at: Date;

  @ManyToOne(() => Company, () => Employee)
  @JoinColumn( {name: 'company_id' })
  company: Company;

  @OneToOne( () => Service, service => service.employees )
  services: Service[];

}

export default Employee;
