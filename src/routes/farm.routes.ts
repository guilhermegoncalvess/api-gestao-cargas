import { Router } from 'express';

import FarmsRepository from '../repositories/FarmsRepository';

const farmRouter = Router();
const farmsRepository = new FarmsRepository();

farmRouter.post('/', async (request, response) => {
  const { name, city, state, owner_id } = request.body;

  try {
    const farm = await farmsRepository.createFarm({
      name,
      city,
      state,
      owner_id,
    });

    return response.json(farm);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

farmRouter.get('/', async (request, response) => {
  const farms = await farmsRepository.all();

  return response.json(farms);
});

export default farmRouter;
