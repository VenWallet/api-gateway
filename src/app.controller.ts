import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller()
export class AppController {
  constructor() {}

  @Get('health')
  @HttpCode(HttpStatus.OK)
  checkHealth(): { status: string } {
    return { status: 'OK' };
  }
}
