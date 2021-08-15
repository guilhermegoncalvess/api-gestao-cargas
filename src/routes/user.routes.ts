import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import authConfig from '../config/auth';

import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';

import verifyToken from '../utils/VerifyToken'
import AppError from '../errors/AppError';

const userRouter = Router();
const usersRepository = new UsersRepository();

userRouter.use(ensureAuthenticated);

/**
 * @swagger
 *
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: UUID
 *          description: The auto-genereted ID.
 *        comapny_id:
 *          type: UUID
 *          description: The auto-genereted ID.
 *        role_id:
 *          type: UUID
 *          description: The auto-genereted ID.
 *        email:
 *          type: string
 *          description: Email login.
 *        password:
 *          type: string
 *          description: Password login.
 *        created_at:
 *          type: Date
 *        updated_at:
 *          type: Date
 *
 *      example:
 *        id: ddsadas
 *        company_id: ddsadas
 *        role_id: ddsadas
 *        email: example@gmail.com
 *        password: sadadada
 *
 */

 /**
 * @swagger
 *
 *  /users:
 *    get:
 *      summary: Get all users.
 *      operationId: findAll
 *      tags: [User]
 *      responses:
 *        "200":
 *          description: An array of users.
 *          schema:
 *            $ref: '#/components/schemas/User'
 *          content:
 *            application/json
 */

userRouter.get('/', async (request, response) => {
  const users = await usersRepository.findAll();

  return response.json(users);
});

/**
* @swagger
*
*  /users/{id}:
*    get:
*      summary: Get all users
*      operationId: findByID
*      tags: [User]
*      responses:
*        "200":
*          description: An array of users
*          schema:
*            $ref: '#/components/schemas/User'
*          content:
*
*/

userRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const user = await usersRepository.findById(id);

  return response.json(user);
});

/**
* @swagger
*
*  /users/company:
*    get:
*      summary: Get all users
*      operationId: findByCompanyId
*      tags: [User]
*      responses:
*        "200":
*          description: An array of users
*          schema:
*            $ref: '#/components/schemas/User'
*          content:
*/

userRouter.get('/company', async (request, response) => {
  const authHeader = request.headers.authorization;

  if(!authHeader){
    throw new AppError('JWT token is missing', 401);
  }

  const { company_id } = verifyToken( authHeader, authConfig.jwt.secret);
  const users = await usersRepository.findByCompanyId(company_id);

  return response.json(users);
});

/**
* @swagger
*
*  /users:
*    post:
*      summary: Get all users
*      operationId: create
*      tags: [User]
*      responses:
*        "200":
*          description: An array of users
*          schema:
*            $ref: '#/components/schemas/User'
*          content:
*
*/

userRouter.post('/', async (request, response) => {
  const { company_id, email, password, role_id } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    company_id,
    email,
    password,
    role_id,
  });

  // @ts-expect-error
  delete user.password;

  return response.status(201).json(user);

});

/**
* @swagger
*
*  /users/{id}:
*    put:
*      summary: Get all users
*      operationId: alter
*      tags: [User]
*      responses:
*        "200":
*          description: An array of users
*          schema:
*            $ref: '#/components/schemas/User'
*          content:
*/

userRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { company_id, email, password, role } = request.body;

  const user = await usersRepository.alter({
    id,
    company_id,
    email,
    password,
    role,
  });

  return response.json(user);

});

/**
* @swagger
*
*  /users/{id}:
*    delete:
*      summary: Get all users
*      operationId: delete
*      tags: [User]
*      responses:
*        "200":
*          description: An array of users
*          schema:
*            $ref: '#/components/schemas/User'
*          content:
*/

userRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const roleuser = await usersRepository.deleteuser(id);

  return response.json({ status: `${roleuser} exluído com sucesso!` });
});

export default userRouter;
