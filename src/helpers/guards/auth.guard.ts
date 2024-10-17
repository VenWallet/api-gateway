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
    const request = context.switchToHttp().getRequest<Request>();
    const mnemonic = request.body.mnemonic || undefined;

    if (!mnemonic) {
      throw new UnauthorizedException('Mnemonic not found');
    }

    try {
      const response = await this.httpService.request<any>({
        method: 'POST',
        url: 'http://micro-blockchain:3000/api/wallet/get-user-id-by-mnemonic',
        body: { mnemonic },
      });

      if (!response.data) {
        throw new UnauthorizedException('User not found');
      }

      const { userId } = response.data;

      request['user'] = { id: userId };

      request.body.userId = userId;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
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
