import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  UseGuards,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Req,
  Request,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ExceptionHandler } from 'src/helpers/handlers/exception.handler';
import { AuthGuard } from 'src/helpers/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpClient } from 'src/shared/http/http.client';
import { CreateUserDto, ImportUserFromMnemonicDto } from './dto/micro-core.dto';

@ApiTags('micro-core')
@Controller()
export class MicroCoreController {
  private readonly httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://micro-core:3000/api/');
  }

  @Get('core/health')
  @ApiOperation({ description: 'health description' })
  @HttpCode(HttpStatus.OK)
  async health() {
    try {
      const { data } = await this.httpClient.request({
        method: 'GET',
        path: `health`,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Post('/user')
  @ApiOperation({ description: 'user create description' })
  @HttpCode(HttpStatus.OK)
  async createUser(@Body() body: CreateUserDto) {
    try {
      const { data } = await this.httpClient.request({
        method: 'POST',
        path: `user`,
        body,
      });

      if (!data) {
        throw new InternalServerErrorException('Failed to create user');
      }

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Post('/auth/import-from-mnemonic')
  @ApiOperation({ description: 'user import description' })
  @HttpCode(HttpStatus.OK)
  async importUserFromMnemonic(@Body() body: ImportUserFromMnemonicDto, @Req() req: Request) {
    try {
      const clientIp = (req as any).ip;

      console.log('IP del cliente:', clientIp);

      const { data } = await this.httpClient.request({
        method: 'POST',
        path: `auth/import-from-mnemonic`,
        body,
      });

      if (!data) {
        throw new InternalServerErrorException('Failed to import user');
      }

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Get('movement')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async getBalances(@Body('userId') userId: string) {
    try {
      const { data } = await this.httpClient.request({
        method: 'GET',
        path: `movement/${userId}`,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }
}
