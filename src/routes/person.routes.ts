import { Router } from 'express';

import PersonsRepository from '../repositories/PersonsRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const personRouter = Router();
const personsRepository = new PersonsRepository();

personRouter.use(ensureAuthenticated);

personRouter.get('/', async (request, response) => {
  try {
    const persons = await personsRepository.findAll();

    return response.json(persons);
  } catch (err) {
    return response
      .status(400)
      .json({ message: err.message });
  }

});

personRouter.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const person = await personsRepository.findById(id);

    return response.json(person);
  } catch (err) {
    return response
      .status(400)
      .json({ message: 'Nenhuma pessoa foi encontrada.' });
  }
});

personRouter.get('/:role', async (request, response) => {
  try {
    const { role } = request.params;

    const person = await personsRepository.findByRole(role);

    return response.json(person);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

personRouter.post('/', async (request, response) => {
  try{
    const { name, nickname, address, city, state, contact, role } = request.body;

    const person = await personsRepository.add({
      name,
      nickname,
      address,
      city,
      state,
      contact,
      role,
    });

    return response.json(person);
  }catch (err){
    return response.status(400).json({ error: err.message });
  }

});

personRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { name, nickname, address, city, state, contact, role } = request.body;

    const person = await personsRepository.alter({
      id,
      name,
      nickname,
      address,
      city,
      state,
      contact,
      role,
    });

    return response.json(person);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

personRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const rolePerson = await personsRepository.deletePerson(id);

    return response.json({ status: `${rolePerson} exluído com sucesso!` });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default personRouter;
