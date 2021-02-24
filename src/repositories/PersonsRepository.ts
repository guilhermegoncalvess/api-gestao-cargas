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
  public async add({
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

  public async getAll(): Promise<Person[]> {
    const personsRepository = getRepository(Person);

    const persons = await personsRepository.find({
      select: ['id', 'address', 'contact', 'name', 'nickname', 'role'],
    });

    return persons;
  }

  public async getById(load: string): Promise<Person> {
    const personsRepository = getRepository(Person);

    const person = await personsRepository.findOne({
      select: ['name', 'nickname', 'address', 'contact', 'role'],
      where: { load },
    });

    if (!person) {
      throw new Error('Person does not exist.');
    }

    return person;
  }

  public async getByRole(id: string | undefined): Promise<Person[]> {
    const personsRepository = getRepository(Person);

    const person = await personsRepository.find({
      select: ['id', 'name', 'nickname', 'address', 'contact'],
      where: { role: id },
    });

    if (!person) {
      throw new Error('Person does not exist.');
    }

    return person;
  }

  public async deletePerson(id: string): Promise<string> {
    const personsRepository = getRepository(Person);

    const person = await personsRepository.findOne(id);

    if (!person) {
      throw new Error('Person does not exist.');
    }

    await personsRepository.remove(person);
    return person.role;
  }
}

export default PersonsRepository;
