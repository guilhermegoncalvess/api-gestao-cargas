import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Company from './Company';
import Farm from './Farm';

@Entity('load')
class Load {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: string;

  @Column()
  company_id: string;

  @ManyToOne(() => Farm)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column()
  farm_id: string;

  @ManyToOne(() => Farm)
  @JoinColumn({ name: 'farm_id' })
  farm: Farm;

  @Column()
  weight: number;

  @Column()
  value: number;

  @Column()
  type: 'truck' | 'bitruck' | 'carretinha';
}

export default Load;
