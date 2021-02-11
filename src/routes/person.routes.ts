import { Router } from 'express';

import EmployeesRepository from '../repositories/PersonsRepository';

const employeeRouter = Router();
const employeesRepository = new EmployeesRepository();

employeeRouter.post('/', (request, response) => {
  const { name, nickname, address, contact, role } = request.body;

  const employee = employeesRepository.create({
    name,
    nickname,
    address,
    contact,
    role,
  });

  return response.json(employee);
});

employeeRouter.get('/', (request, response) => {
  const employ = employeesRepository;

  return response.json(employ);
});

export default employeeRouter;
