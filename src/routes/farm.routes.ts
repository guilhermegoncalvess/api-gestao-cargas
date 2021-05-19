import { Router } from 'express';

import FarmsRepository from '../repositories/FarmsRepository';

const farmRouter = Router();
const farmsRepository = new FarmsRepository();

farmRouter.get('/', async (request, response) => {

  try {
    const farms = await farmsRepository.findAll();
  
    return response.json(farms);

  }catch (err) {
    return response
      .status(400)
      .json({ message: 'Nenhuma fazenda foi encontrada.' });
  }
});

farmRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const farms = await farmsRepository.findById(id);
  
    return response.json(farms[0]);

  }catch (err) {
    return response
      .status(400)
      .json({ message: 'Nenhuma fazenda foi encontrada.' });
  }
});

farmRouter.post('/', async (request, response) => {
  const { name, address, city, state, owner_id } = request.body;

  try {
    const farm = await farmsRepository.add({
      name,
      address,
      city,
      state,
      owner_id,
    });

    return response.json(farm);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

farmRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, address, city, state, owner_id } = request.body;

  try {
    const person = await farmsRepository.alter({
      id,
      name,
      address,
      city,
      state,
      owner_id,
    });

    return response.json(person);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

farmRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  try {
    await farmsRepository.deleteFarm(id);

    return response.json({ status: 'Fazenda exluída com sucesso!' });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default farmRouter;
