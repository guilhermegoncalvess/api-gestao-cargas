import { Router } from 'express';

import PersonsRepository from '../repositories/PersonsRepository';

const personRouter = Router();
const personsRepository = new PersonsRepository();

personRouter.get('/', async (request, response) => {
  const persons = await personsRepository.getAll();

  return response.json(persons);
});

personRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  try {
    const person = await personsRepository.getById(id);

    return response.json(person);
  } catch (err) {
    return response
      .status(400)
      .json({ message: 'Nenhuma pessoa foi encontrada.' });
  }
});

personRouter.get('/:role', async (request, response) => {
  const { role } = request.params;
  try {
    const person = await personsRepository.getByRole(role);

    return response.json(person);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

personRouter.post('/', async (request, response) => {
  const { name, nickname, address, contact, role } = request.body;

  const person = await personsRepository.add({
    name,
    nickname,
    address,
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
