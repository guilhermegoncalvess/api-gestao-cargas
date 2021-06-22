import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import User  from '../models/User';
import Company  from '../models/Company';

interface Request {
  company_id: string;
  email: string;
  password: string;
  role: string;
}

class CreateUserService {
  public async execute({ company_id, email, password, role }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const companiesRepository = getRepository(Company);

    const company = await companiesRepository.findOne(company_id)

    if(!company) {
      throw new AppError('Company does not exist.', 404);
    }

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if(checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8)

    const user = usersRepository.create({
      company_id,
      email,
      password: hashedPassword,
      role,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
