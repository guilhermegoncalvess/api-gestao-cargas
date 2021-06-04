import { Router } from 'express';
import User from '../models/User';

import AuthenticateUserService from '../services/AuthenticateUserService'

const sessionsRouter = Router();


sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  // @ts-expect-error
  delete user.password;

  return response.status(201).json({ user, token });
});

export default sessionsRouter;
