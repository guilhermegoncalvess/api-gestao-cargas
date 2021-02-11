import Person from '../models/Person';

interface CreateRepositoryDTO {
  name: string;
  nickname: string;
  address: string;
  contact: string;
  role: 'Motorista' | 'Embalador' | 'Propietario';
}

class PersonsRepository {
  private persons: Person[];

  constructor() {
    this.persons = [];
  }

  public all(): Person[] {
    return this.persons;
  }

  public create({
    name,
    nickname,
    address,
    contact,
    role,
  }: CreateRepositoryDTO): Person {
    const person = new Person({
      name,
      nickname,
      address,
      contact,
      role,
    });

    this.persons.push(person);

    return person;
  }
}

export default PersonsRepository;
