import { uuid } from 'uuidv4';

class Company {
  id: string;

  name: string;

  address: string;

  contact: string;

  owner: string;

  constructor({ name, address, contact, owner }: Omit<Company, 'id'>) {
    this.id = uuid();
    this.name = name;
    this.address = address;
    this.contact = contact;
    this.owner = owner;
  }
}

export default Company;
