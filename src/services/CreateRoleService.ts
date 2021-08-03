import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Role  from '../models/Role';
import Company  from '../models/Company';

interface Request {
  company_id: string;
  name: string;
  permission: any;
}

class CreateRoleService {
  public async execute({ company_id, name, permission }: Request): Promise<Role> {
    const rolesRepository = getRepository(Role);
    const companiesRepository = getRepository(Company);
    var permissionDefault = {}

    const company = await companiesRepository.findOne(company_id)

    if(!company) {
      throw new AppError('Company does not exist.', 404);
    }

    if(!permission) {
      permissionDefault  = {
                              "users":
                                      {
                                          "create": true,
                                          "read": true,
                                          "update": true,
                                          "delete": true
                                      },
                              "employees":
                                      {
                                          "read": true,
                                          "create": true,
                                          "update": true,
                                          "delete": false
                                      },
                              "roles":
                                      {
                                          "create": true,
                                          "read": true,
                                          "update": true,
                                          "delete": true
                                      },
                              "services":
                                      {
                                          "create": true,
                                          "read": true,
                                          "update": true,
                                          "delete": true
                                      },
                              "load":
                                      {
                                          "create": true,
                                          "read": true,
                                          "update": true,
                                          "delete": true
                                      },
                              "farm":
                                      {
                                          "create": true,
                                          "read": true,
                                          "update": true,
                                          "delete": true
                                      }
                            }
    }

    const role = rolesRepository.create({
      company_id,
      name,
      permission: permission ? permission : permissionDefault,
    });

    await rolesRepository.save(role);

    return role;
  }
}

export default CreateRoleService;
