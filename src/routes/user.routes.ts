import { Router } from 'express';

import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';

const userRouter = Router();
const usersRepository = new UsersRepository();

userRouter.get('/', async (request, response) => {
  try {

    const users = await usersRepository.findAll();


    return response.json(users);
  } catch (err) {
    return response
      .status(400)
      .json({ message: err.message });
  }

});

userRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  try {
    const user = await usersRepository.findById(id);

    return response.json(user);
  } catch (err) {
    return response
      .status(400)
      .json({ message: 'Nenhuma pessoa foi encontrada.' });
  }
});


userRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    email,
    password,
  });

  // @ts-expect-error
  delete user.password;

  return response.status(201).json(user);

});

userRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { email, password } = request.body;

  const user = await usersRepository.alter({
    id,
    email,
    password,
  });

  return response.json(user);

});

userRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const roleuser = await usersRepository.deleteuser(id);

  return response.json({ status: `${roleuser} exluído com sucesso!` });
});

export default userRouter;
