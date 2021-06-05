import { EntityRepository, getRepository, Repository } from 'typeorm';
import AppError from '../errors/AppError';
import Company from '../models/Company';

import User from '../models/User';

interface CreateuserDTO {
  id?: string;
  company_id?: string;
  email: string;
  password: string;
  role: string;
}

@EntityRepository(User)
class usersRepository extends Repository<User> {
  public async findAll(): Promise<User[]> {
    const usersRepository = getRepository(User);

    const users = await usersRepository.find({
      select: ['id', 'email', 'password'],
    });

    if (!users) {
      throw new AppError('Users not found.', 404);
    }

    return users;
  }

  public async findById(id: string): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      select: ['id', 'email', 'password'],
      where: { id },
    });

    if (!user) {
      throw new AppError('user does not exist.', 404);
    }

    return user;
  }

  public async findByRole(id: string | undefined): Promise<User[]> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.find({
      select: ['id', 'email', 'password'],
      where: { role: id },
    });

    if (!user) {
      throw new AppError('user does not exist.', 404);
    }

    return user;
  }

  public async add({
    company_id,
    email,
    password,
    role,
  }: CreateuserDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const companiesRepository = getRepository(Company);

    const company = companiesRepository.findOne(company_id)

    if(!company) {
      throw new AppError('Company does not exist.', 404);
    }

    const user = usersRepository.create({
      company_id,
      password,
      email,
      role,
    });

    await usersRepository.save(user);

    return user;
  }

  public async alter({
    id,
    email,
    password,
    role,
  }: CreateuserDTO): Promise<User> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('user does not exist.', 404);
    }

    if (email) user.email = email;
    if (password) user.password = password;
    if (role) user.role = role;

    await usersRepository.save(user);

    return user;
  }

  public async deleteuser(id: string): Promise<void> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('user does not exist.', 404);
    }

    await usersRepository.remove(user);
  }
}

export default usersRepository;
