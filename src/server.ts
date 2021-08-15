import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import routes from './routes';

import swaggerOptions from './documentation/swagger.json';
import './database';
import AppError from './errors/AppError';

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if( err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err)
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
})

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
