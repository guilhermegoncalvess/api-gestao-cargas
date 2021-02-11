import { Router } from 'express';

import FarmsRepository from '../repositories/FarmsRepository';

const farmRouter = Router();
const farmsRepository = new FarmsRepository();

farmRouter.post('/', (request, response) => {
  const { name, city, state, owner } = request.body;

  const farm = farmsRepository.create({
    name,
    city,
    state,
    owner,
  });

  return response.json(farm);
});

farmRouter.get('/', (request, response) => {
  const farms = farmsRepository.all();

  return response.json(farms);
});

export default farmRouter;
