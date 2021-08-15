import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import RolesRepository from '../repositories/RolesRepository';
import CreateRoleService from '../services/CreateRoleService';

const roleRouter = Router();
const rolesRepository = new RolesRepository();

// roleRouter.use(ensureAuthenticated);

roleRouter.get('/', async (request, response) => {
  const permissions = await rolesRepository.findAll();

  return response.json(permissions);
});

roleRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const user = await rolesRepository.findById(id);

  return response.json(user);
});


roleRouter.post('/', async (request, response) => {
  const { company_id, name, permission } = request.body;

  const createRole = new CreateRoleService();

  const role = await createRole.execute({
    company_id,
    name,
    permission,
  });

  return response.status(201).json(role);

});

roleRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { company_id, name, permission } = request.body;

  const role = await rolesRepository.alter({
    id,
    company_id,
    name,
    permission,
  });

  return response.json(role);

});

roleRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const roleuser = await rolesRepository.deleteuser(id);

  return response.json({ status: 'Role exluído com sucesso!' });
});

export default roleRouter;
