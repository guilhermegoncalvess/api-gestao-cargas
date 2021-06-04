import { EntityRepository, getRepository, Repository } from 'typeorm';
import AppError from '../errors/AppError';

import Person from '../models/Person';

interface CreatePersonDTO {
  id?: string;
  name: string;
  nickname: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  role: 'Motorista' | 'Embalador' | 'Propietario';
}

@EntityRepository(Person)
class PersonsRepository extends Repository<Person> {
  public async findAll(): Promise<Person[]> {
    const personsRepository = getRepository(Person);

    const persons = await personsRepository.find({
      select: ['id', 'address', 'contact', 'name', 'nickname', 'role'],
    });

    if (!persons) {
      throw new AppError('Persons not found.', 404);
    }

    return persons;
  }

  public async findById(id: string): Promise<Person> {
    const personsRepository = getRepository(Person);

    const person = await personsRepository.findOne({
      select: ['name', 'nickname', 'address', 'contact', 'role'],
      where: { id },
    });

    if (!person) {
      throw new AppError('Person does not exist.', 404);
    }

    return person;
  }

  public async findByRole(id: string | undefined): Promise<Person[]> {
    const personsRepository = getRepository(Person);

    const person = await personsRepository.find({
      select: ['id', 'name', 'nickname', 'address', 'contact'],
      where: { role: id },
    });

    if (!person) {
      throw new AppError('Person does not exist.', 404);
    }

    return person;
  }

  public async add({
    name,
    nickname,
    address,
    city,
    state,
    contact,
    role,
  }: CreatePersonDTO): Promise<Person> {
    const personsRepository = getRepository(Person);

    const person = personsRepository.create({
      name,
      nickname,
      address,
      city,
      state,
      contact,
      role,
    });

    await personsRepository.save(person);

    return person;
  }

  public async alter({
    id,
    name,
    nickname,
    address,
    contact,
    role,
  }: CreatePersonDTO): Promise<Person> {
    const personsRepository = getRepository(Person);
    const person = await personsRepository.findOne(id);

    if (!person) {
      throw new AppError('Person does not exist.', 404);
    }

    if (name) person.name = name;
    if (nickname) person.nickname = nickname;
    if (address) person.address = address;
    if (contact) person.contact = contact;
    if (role) person.role = role;

    await personsRepository.save(person);

    return person;
  }

  public async deletePerson(id: string): Promise<string> {
    const personsRepository = getRepository(Person);

    const person = await personsRepository.findOne(id);

    if (!person) {
      throw new AppError('Person does not exist.', 404);
    }

    await personsRepository.remove(person);
    return person.role;
  }
}

export default PersonsRepository;
