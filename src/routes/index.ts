import { Router } from 'express';
import employeeRouter from './employee.routes';
import companyRouter from './company.routes';
import farmRouter from './farm.routes';
import serviceRouter from './service.routes';
import loadRouter from './load.routes';
import userRouter from './user.routes';
import sessionsRouter from './sessions.routes';
import roleRouter from './role.routes';

const routes = Router();

routes.use('/employees', employeeRouter);
routes.use('/companies', companyRouter);
routes.use('/farms', farmRouter);
routes.use('/services', serviceRouter);
routes.use('/loads', loadRouter);

routes.use('/users', userRouter);
routes.use('/roles', roleRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
