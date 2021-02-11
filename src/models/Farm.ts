import { uuid } from 'uuidv4';

class Farm {
  id: string;

  name: string;

  city: string;

  state: string;

  owner: string;

  constructor({ name, city, state, owner }: Omit<Farm, 'id'>) {
    this.id = uuid();
    this.name = name;
    this.city = city;
    this.state = state;
    this.owner = owner;
  }
}

export default Farm;
