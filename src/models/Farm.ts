import { IsDate, isString, IsString, Length } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Service from './Service';

@Entity('farm')
class Farm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @Length(1, 30)
  name: string;

  @Column()
  @IsString()
  @Length(1, 30)
  owner: string;

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

  @CreateDateColumn()
  @IsDate()
  created_at: Date;

  @UpdateDateColumn()
  @IsDate()
  updated_at: Date;

  @OneToMany(() => Service, service => service.farm)
  services: Service[];
}

export default Farm;
