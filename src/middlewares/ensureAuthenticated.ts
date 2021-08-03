import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { verify } from 'jsonwebtoken';

import Role from '../models/Role';

import AppError from '../errors/AppError';

import authConfig from '../config/auth';
import User from '../models/User';

import verifyToken from '../utils/VerifyToken'

export default async function ensureAuthenticate(request: Request, response: Response, next: NextFunction): Promise<void> {


  const methodsPermissionsKeys: any  = {
    GET: "read",
    POST: "create",
    PUT: "update",
    DELETE: "delete",
  }

  const authHeader = request.headers.authorization;
  const url = request.baseUrl;
  const method = request.method;


  if(!authHeader){
    throw new AppError('JWT token is missing', 401);
  }

  try {

      const usersRepository = getRepository(User);
      const rolesRepository = getRepository(Role);


      const [, path] = url.split('/');

      const { user_id, company_id } = verifyToken( authHeader, authConfig.jwt.secret);

      //Separar em outro middlewares a partir daqui para lidar apenas com os roles do usuário
      const user = await usersRepository.findOne({id: user_id, company_id})

      if(user) {
        const role = await rolesRepository.findOne({id:user.role_id})

        if(role) {
          if(!(role.name === 'super')) {
            const keysRole = Object.keys(role.permission);

            if(!keysRole.find( entity => entity === path.toLowerCase())) {
              throw new AppError('Permission denied', 401);
            }
            if(!role.permission[path][methodsPermissionsKeys[method]]){
              throw new AppError('Permission denied', 401);
            }
            return next();
          }
          return next();
        }

      }

    } catch(err){
      if( err instanceof AppError) {
        throw new AppError(err.message, 401);
      } else {
        throw new AppError('Invalid JWT token.', 401);
      }
    }


}
