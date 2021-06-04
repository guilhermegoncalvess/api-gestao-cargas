import { Router } from 'express';

import PersonsRepository from '../repositories/PersonsRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const personRouter = Router();
const personsRepository = new PersonsRepository();

personRouter.use(ensureAuthenticated);

personRouter.get('/', async (request, response) => {
    const persons = await personsRepository.findAll();

    return response.json(persons);
});

personRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const person = await personsRepository.findById(id);

  return response.json(person);
});

personRouter.get('/:role', async (request, response) => {
  const { role } = request.params;

  const person = await personsRepository.findByRole(role);

  return response.json(person);
});

personRouter.post('/', async (request, response) => {
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

  return response.status(201).json(person);
});

personRouter.put('/:id', async (request, response) => {
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
});

personRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const rolePerson = await personsRepository.deletePerson(id);

  return response.json({ status: `${rolePerson} exluído com sucesso!` });

});

export default personRouter;
