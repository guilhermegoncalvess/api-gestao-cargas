import { Router } from 'express';

import EmployeesRepository from '../repositories/EmployeesRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const employeeRouter = Router();
const employeesRepository = new EmployeesRepository();

employeeRouter.use(ensureAuthenticated);

employeeRouter.get('/', async (request, response) => {
    const employees = await employeesRepository.findAll();

    return response.json(employees);
});

employeeRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const employee = await employeesRepository.findById(id);

  return response.json(employee);
});

employeeRouter.get('/:responsibility', async (request, response) => {
  const { responsibility } = request.params;

  const employee = await employeesRepository.findByresponsibility(responsibility);

  return response.json(employee);
});

employeeRouter.post('/', async (request, response) => {
  const { name, nickname, address, city, state, contact, responsibility } = request.body;

  const employee = await employeesRepository.add({
    name,
    nickname,
    address,
    city,
    state,
    contact,
    responsibility,
  });

  return response.status(201).json(employee);
});

employeeRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, nickname, address, city, state, contact, responsibility } = request.body;

  const employee = await employeesRepository.alter({
    id,
    name,
    nickname,
    address,
    city,
    state,
    contact,
    responsibility,
  });

  return response.json(employee);
});

employeeRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const responsibilityEmployee = await employeesRepository.deletePerson(id);

  return response.json({ status: `${responsibilityEmployee} exluído com sucesso!` });

});

export default employeeRouter;
