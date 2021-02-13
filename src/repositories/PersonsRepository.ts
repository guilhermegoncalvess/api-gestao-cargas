import { EntityRepository, getRepository, Repository } from 'typeorm';
import Person from '../models/Person';

interface CreateRepositoryDTO {
  name: string;
  nickname: string;
  address: string;
  contact: string;
  role: 'Motorista' | 'Embalador' | 'Propietario';
}

@EntityRepository(Person)
class PersonsRepository extends Repository<Person> {
  public async createPerson({
    name,
    nickname,
    address,
    contact,
    role,
  }: CreateRepositoryDTO): Promise<Person> {
    const personsRepository = getRepository(Person);
    const person = personsRepository.create({
      name,
      nickname,
      address,
      contact,
      role,
    });

    await personsRepository.save(person);

    return person;
  }

  public async all(): Promise<Person[]> {
    const personsRepository = getRepository(Person);

    const persons = await personsRepository.find({
      select: ['id', 'address', 'contact', 'name', 'nickname', 'role'],
    });

    return persons;
  }
}

export default PersonsRepository;
