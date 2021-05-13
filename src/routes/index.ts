import { Router } from 'express';
import personRouter from './person.routes';
import companyRouter from './company.routes';
import farmRouter from './farm.routes';
import serviceRouter from './service.routes';
import loadRouter from './load.routes';

const routes = Router();

routes.use('/persons', personRouter);
routes.use('/companies', companyRouter);
routes.use('/farms', farmRouter);
routes.use('/services', serviceRouter);
routes.use('/loads', loadRouter);

export default routes;
