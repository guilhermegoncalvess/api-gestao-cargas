import { Router } from 'express';

import FarmsRepository from '../repositories/FarmsRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const farmRouter = Router();
const farmsRepository = new FarmsRepository();

farmRouter.use(ensureAuthenticated);

farmRouter.get('/', async (request, response) => {
  const farms = await farmsRepository.findAll();

  return response.json(farms);

});

farmRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const farms = await farmsRepository.findById(id);

  return response.json(farms[0]);

});

farmRouter.post('/', async (request, response) => {
  const { name, address, city, state, contact, owner } = request.body;

  const farm = await farmsRepository.add({
    name,
    address,
    city,
    state,
    contact,
    owner,
  });

  return response.status(201).json(farm);
});

farmRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, address, city, state, contact, owner } = request.body;

  const person = await farmsRepository.alter({
    id,
    name,
    address,
    city,
    state,
    contact,
    owner,
  });

  return response.json(person);

});

farmRouter.delete('/:id', async (request, response) => {
    const { id } = request.params;

    await farmsRepository.deleteFarm(id);

    return response.json({ status: 'Fazenda exluída com sucesso!' });

});

export default farmRouter;
