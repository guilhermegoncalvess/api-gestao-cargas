import { Router } from 'express';
import personRouter from './person.routes';
import companyRouter from './company.routes';
import farmRouter from './farm.routes';
import serviceRouter from './service.routes';
import loadRouter from './load.routes';

const routes = Router();

routes.use('/person', personRouter);
routes.use('/company', companyRouter);
routes.use('/farm', farmRouter);
routes.use('/service', serviceRouter);
routes.use('/load', loadRouter);

export default routes;
