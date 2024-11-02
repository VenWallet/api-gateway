import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as dotenv from 'dotenv';
import { HttpService } from '@nestjs/axios';
import { HttpCustomService } from 'src/shared/http/http.service';
dotenv.config();

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly httpService: HttpCustomService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return false;
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      return false;
    }

    try {
      const response = await this.httpService.request<any>({
        method: 'POST',
        url: 'http://micro-core:3000/api/auth/check-user',
        config: {
          headers: {
            Authorization: authHeader,
          },
        },
      });

      if (!response.data) {
        throw new UnauthorizedException('User not found');
      }

      req.body.mnemonic = response.data.mnemonic;
      req.body.userId = response.data.userId;

      return true;
    } catch (error) {
      return false;
    }
  }
}

// const request = context.switchToHttp().getRequest();
// const token = this.extractTokenFromHeader(request);
// if (!token) {
//   console.log('token not found');
//   throw new UnauthorizedException();
// }
// try {
//   const payload = await this.jwtService.verifyAsync(token, {
//     secret: process.env.JWT_SECRET,
//   });

//   request['client'] = payload;
// } catch (e: any) {
//   console.log('error');
//   console.log(e);
//   throw new UnauthorizedException();
// }
// return true;
// }

// private extractTokenFromHeader(request: Request): string | undefined {
// const [type, token] = request.headers.authorization?.split(' ') ?? [];
// return type === 'Bearer' ? token : undefined;
// }
