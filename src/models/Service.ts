import { uuid } from 'uuidv4';

class Service {
  id: string;

  employee: string;

  load: string;

  constructor({ employee, load }: Omit<Service, 'id'>) {
    this.id = uuid();
    this.employee = employee;
    this.load = load;
  }
}

export default Service;
