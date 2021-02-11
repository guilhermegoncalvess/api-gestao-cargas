import { uuid } from 'uuidv4';

class Load {
  id: string;

  date: string;

  company: string;

  farm: string;

  weight: number;

  value: number;

  type: 'truck' | 'bitruck' | 'carretinha';

  constructor({ date, company, farm, weight, value, type }: Omit<Load, 'id'>) {
    this.id = uuid();
    this.date = date;
    this.company = company;
    this.farm = farm;
    this.weight = weight;
    this.value = value;
    this.type = type;
  }
}

export default Load;
