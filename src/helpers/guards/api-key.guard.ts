import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly validApiKeys: string[] = [process.env.API_KEY!];

  canActivate(context: ExecutionContext): boolean {
    const req: Request = context.switchToHttp().getRequest();

    const apiKey = req.headers['x-api-key'];

    if (!apiKey || !this.validApiKeys.includes(apiKey as string)) {
      throw new UnauthorizedException('Invalid API Key');
    }

    return true;
  }
}
