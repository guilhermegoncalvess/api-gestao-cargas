import { Router } from 'express';

import LoadsRepository from '../repositories/LoadsRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const loadRouter = Router();
const loadsRepository = new LoadsRepository();

loadRouter.use(ensureAuthenticated);

loadRouter.get('/', async (request, response) => {
  try
  {
    const loads = await loadsRepository.findAll();

    return response.json(loads);
  } catch (err) {
    return response
      .status(400)
      .json({ message: 'Nenhuma carga foi encontrada.' });
  }
});

loadRouter.post('/', async (request, response) => {
  try {
    const { date, company_id, farm_id, weight, cost, type } = request.body;

    const load = await loadsRepository.add({
      date,
      company_id,
      farm_id,
      weight,
      cost,
      type,
    });

    return response.json(load);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default loadRouter;
