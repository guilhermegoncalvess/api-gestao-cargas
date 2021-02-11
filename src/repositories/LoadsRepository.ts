import Load from '../models/Load';

interface CreateLoadDTO {
  date: string;
  company: string;
  farm: string;
  weight: number;
  value: number;
  type: 'truck' | 'bitruck' | 'carretinha';
}

class LoadsRepository {
  private loads: Load[];

  constructor() {
    this.loads = [];
  }

  public all(): Load[] {
    return this.loads;
  }

  public create({
    date,
    company,
    farm,
    weight,
    value,
    type,
  }: CreateLoadDTO): Load {
    const load = new Load({
      date,
      company,
      farm,
      weight,
      value,
      type,
    });

    this.loads.push(load);

    return load;
  }
}

export default LoadsRepository;
