import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { verify } from 'jsonwebtoken';

import Role from '../models/Role';

import AppError from '../errors/AppError';

import authConfig from '../config/auth';
import routes from '../routes';
import User from '../models/User';


interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default async function ensureAuthenticate(request: Request, response: Response, next: NextFunction): Promise<void> {

  const authHeader = request.headers.authorization;
  const url = request.baseUrl;
  const method = request.method;


  if(!authHeader){
    throw new AppError('JWT token is missing', 401);
  }

  try {

      const usersRepository = getRepository(User);
      const rolesRepository = getRepository(Role);

      const [, token] = authHeader.split(' ');
      const [, path] = url.split('/');


      const decoded = verify(token, authConfig.jwt.secret);

      const { sub } = decoded as TokenPayload;

      //Separar em outro middlewares a partir daqui para lidar apenas com os roles do usuário
      const user = await usersRepository.findOne(sub)

      if(user) {
        const role = await rolesRepository.findOne(user.role_id)

        if(method === 'GET') {
          if(!role?.permission[path].read) {
            throw new AppError('Permission denied', 401)
          }
        }

        if(method === 'POST') {
          if(!role?.permission[path].create) {
            throw new AppError('Permission denied', 401)
          }
        }

        if(method === 'PUT') {
          if(!role?.permission[path].update) {
            throw new AppError('Permission denied', 401)
          }
        }

        if(method === 'DELETE') {
          if(!role?.permission[path].delete) {
            throw new AppError('Permission denied', 401)
          }
        }
        return next();

      }

    } catch(err){
      throw new AppError('Invaild JWT token.', 401)
    }


}
