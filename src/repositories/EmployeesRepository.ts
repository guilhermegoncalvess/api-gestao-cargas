import { EntityRepository, getRepository, Repository } from 'typeorm';
import AppError from '../errors/AppError';
import Employee from '../models/Employee';


interface CreatePersonDTO {
  id?: string;
  name: string;
  nickname: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  responsibility: 'Motorista' | 'Embalador' ;
}

@EntityRepository(Employee)
class employeesRepository extends Repository<Employee> {
  public async findAll(): Promise<Employee[]> {
    const employeesRepository = getRepository(Employee);

    const employees = await employeesRepository.find({
      select: ['id', 'address', 'contact', 'name', 'nickname', 'responsibility'],
      // relations: ['services']
    });

    if (!employees) {
      throw new AppError('employees not found.', 404);
    }

    return employees;
  }

  public async findById(id: string): Promise<Employee> {
    const employeesRepository = getRepository(Employee);

    const employee = await employeesRepository.findOne({
      select: ['name', 'nickname', 'address', 'contact', 'responsibility'],
      where: { id },
    });

    if (!employee) {
      throw new AppError('Employee does not exist.', 404);
    }

    return employee;
  }

  public async findByresponsibility(id: string | undefined): Promise<Employee[]> {
    const employeesRepository = getRepository(Employee);

    const employee = await employeesRepository.find({
      select: ['id', 'name', 'nickname', 'address', 'contact'],
      where: { responsibility: id },
    });

    if (!employee) {
      throw new AppError('Employee does not exist.', 404);
    }

    return employee;
  }

  public async add({
    name,
    nickname,
    address,
    city,
    state,
    contact,
    responsibility,
  }: CreatePersonDTO): Promise<Employee> {
    const employeesRepository = getRepository(Employee);

    const employee = employeesRepository.create({
      name,
      nickname,
      address,
      city,
      state,
      contact,
      responsibility,
    });

    await employeesRepository.save(employee);

    return employee;
  }

  public async alter({
    id,
    name,
    nickname,
    address,
    contact,
    responsibility,
  }: CreatePersonDTO): Promise<Employee> {
    const employeesRepository = getRepository(Employee);
    const employee = await employeesRepository.findOne(id);

    if (!employee) {
      throw new AppError('Person does not exist.', 404);
    }

    if (name) employee.name = name;
    if (nickname) employee.nickname = nickname;
    if (address) employee.address = address;
    if (contact) employee.contact = contact;
    if (responsibility) employee.responsibility = responsibility;

    await employeesRepository.save(employee);

    return employee;
  }

  public async deletePerson(id: string): Promise<string> {
    const employeesRepository = getRepository(Employee);

    const employee = await employeesRepository.findOne(id);

    if (!employee) {
      throw new AppError('Employee does not exist.', 404);
    }

    await employeesRepository.remove(employee);
    return employee.responsibility;
  }
}

export default employeesRepository;
