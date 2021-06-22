import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';

const userRouter = Router();
const usersRepository = new UsersRepository();

// userRouter.use(ensureAuthenticated);

userRouter.get('/', async (request, response) => {
  const users = await usersRepository.findAll();

  return response.json(users);
});

userRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const user = await usersRepository.findById(id);

  return response.json(user);
});


userRouter.post('/', async (request, response) => {
  const { company_id, email, password, role } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    company_id,
    email,
    password,
    role,
  });

  // @ts-expect-error
  delete user.password;

  return response.status(201).json(user);

});

userRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { company_id, email, password, role } = request.body;

  const user = await usersRepository.alter({
    id,
    company_id,
    email,
    password,
    role,
  });

  return response.json(user);

});

userRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const roleuser = await usersRepository.deleteuser(id);

  return response.json({ status: `${roleuser} exluído com sucesso!` });
});

export default userRouter;
