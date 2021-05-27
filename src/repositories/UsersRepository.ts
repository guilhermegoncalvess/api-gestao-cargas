import { EntityRepository, getRepository, Repository } from 'typeorm';

import User from '../models/User';

interface CreateuserDTO {
  id?: string;
  email: string;
  password: string;
}

@EntityRepository(User)
class usersRepository extends Repository<User> {
  public async findAll(): Promise<User[]> {
    const usersRepository = getRepository(User);

    const users = await usersRepository.find({
      select: ['id', 'email', 'password'],
    });

    if (!users) {
      throw new Error('users not found.');
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
      throw new Error('user does not exist.');
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
      throw new Error('user does not exist.');
    }

    return user;
  }

  public async add({
    email,
    password,
  }: CreateuserDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const user = usersRepository.create({
      password,
      email,
    });

    await usersRepository.save(user);

    return user;
  }

  public async alter({
    id,
    email,
    password,
  }: CreateuserDTO): Promise<User> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new Error('user does not exist.');
    }

    if (email) user.email = email;
    if (password) user.password = password;

    await usersRepository.save(user);

    return user;
  }

  public async deleteuser(id: string): Promise<void> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new Error('user does not exist.');
    }

    await usersRepository.remove(user);
  }
}

export default usersRepository;
