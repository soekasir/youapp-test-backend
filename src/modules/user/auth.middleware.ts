import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { IncomingHttpHeaders } from 'http';
import { UsersService } from './users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private usersService: UsersService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const headers: IncomingHttpHeaders = req.headers;
      const authorization: string = headers.authorization;
      const bearerToken: string[] = authorization.split(' ');
      const token: string = bearerToken[1];

      const payload = await this.jwt.verifyAsync(token, {
        ignoreExpiration: false,
        secret: this.config.get('JWT_SECRET'),
      });
      const activeUser = await this.usersService.getUser(payload.email);
      if (!activeUser) {
        throw new UnauthorizedException();
      }
      req['user'] = activeUser;
      next();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
