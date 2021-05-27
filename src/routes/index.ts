import { Router } from 'express';
import personRouter from './person.routes';
import companyRouter from './company.routes';
import farmRouter from './farm.routes';
import serviceRouter from './service.routes';
import loadRouter from './load.routes';
import userRouter from './user.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/persons', personRouter);
routes.use('/companies', companyRouter);
routes.use('/farms', farmRouter);
routes.use('/services', serviceRouter);
routes.use('/loads', loadRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
