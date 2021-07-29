import { hash } from 'bcryptjs';
import { EntityRepository, getCustomRepository, getRepository, Repository } from 'typeorm';
import AppError from '../errors/AppError';
import Role from '../models/Role';

import User from '../models/User';

interface CreateRoleDTO {
  id?: string;
  company_id?: string;
  name: string;
  permission: any;
}

@EntityRepository(User)
class RolesRepository extends Repository<Role> {
  public async findAll(): Promise<Role[]> {
    const rolesRepository = getRepository(Role);

    const roles = await rolesRepository.find({
      select: ['id', 'company_id', 'name', 'permission'],
    });

    if (!roles) {
      throw new AppError('Users not found.', 404);
    }

    return roles;
  }

  public async findById(id: string): Promise<Role> {
    const rolesRepository = getRepository(Role);

    const role = await rolesRepository.findOne({
      select: ['id', 'company_id', 'name', 'permission'],
      where: { id },
    });

    if (!role) {
      throw new AppError('user does not exist.', 404);
    }

    return role;
  }

  public async findByRole(id: string | undefined): Promise<Role[]> {
    const rolesRepository = getRepository(Role);

    const role = await rolesRepository.find({
      select: ['id', 'company_id', 'name', 'permission'],
      where: { id },
    });

    if (!role) {
      throw new AppError('role does not exist.', 404);
    }

    return role;
  }

  public async add({
    id,
    company_id,
    name,
    permission,
  }: CreateRoleDTO): Promise<Role> {
    const rolesRepository = getCustomRepository(RolesRepository);

    const role = rolesRepository.create({
      id,
      company_id,
      name,
      permission
    });

    await rolesRepository.save(role);

    return role;
  }
  public async alter({
    id,
    company_id,
    name,
    permission,
  }: CreateRoleDTO): Promise<Role> {
    const rolesRepository = getRepository(Role);

    const role = await rolesRepository.findOne({ id });

    if (!role) {
      throw new AppError('role does not exist.', 404);
    }

    if (name) role.name = name;
    if (permission) role.permission = permission;

    await rolesRepository.save(role);

    return role;
  }

  public async deleteuser(id: string): Promise<void> {
    const rolesRepository = getRepository(Role);

    const role = await rolesRepository.findOne({ id });

    if (!role) {
      throw new AppError('Role does not exist.', 404);
    }

    await rolesRepository.remove(role);
  }
}

export default RolesRepository;
