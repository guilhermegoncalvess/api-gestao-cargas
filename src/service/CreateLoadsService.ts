import Load from '../models/Load';
import LoadsRepository from '../repositories/LoadsRepository';

interface Request {
  date: string;

  company: string;

  farm: string;

  weight: number;

  value: number;

  type: 'truck' | 'bitruck' | 'carretinha';
}

class CreateLoadsService {
  private loadsRepositories: LoadsRepository;

  constructor(loadsRepositories: LoadsRepository) {
    this.loadsRepositories = loadsRepositories;
  }

  // public execute({ date, company, farm, weight, value, type }: Request): Load {}
}

export default CreateLoadsService;
