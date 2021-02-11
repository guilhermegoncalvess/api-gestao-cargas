import { uuid } from 'uuidv4';

class Person {
  id: string;

  name: string;

  nickname: string;

  address: string;

  contact: string;

  role: 'Motorista' | 'Embalador' | 'Propietario';

  constructor({ name, nickname, address, contact, role }: Omit<Person, 'id'>) {
    this.id = uuid();
    this.name = name;
    this.nickname = nickname;
    this.address = address;
    this.contact = contact;
    this.role = role;
  }
}

export default Person;
