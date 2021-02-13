import { Router } from 'express';

import PersonsRepository from '../repositories/PersonsRepository';

const personRouter = Router();
const personsRepository = new PersonsRepository();

personRouter.post('/', async (request, response) => {
  const { name, nickname, address, contact, role } = request.body;

  const person = await personsRepository.createPerson({
    name,
    nickname,
    address,
    contact,
    role,
  });

  return response.json(person);
});

personRouter.get('/', async (request, response) => {
  const persons = await personsRepository.all();

  return response.json(persons);
});

export default personRouter;
