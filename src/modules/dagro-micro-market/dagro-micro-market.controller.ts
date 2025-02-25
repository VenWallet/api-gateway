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
  Query,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ExceptionHandler } from 'src/helpers/handlers/exception.handler';
import { AuthGuard } from 'src/helpers/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpClient } from 'src/shared/http/http.client';
import { RegisterInteractionDto, RegisterSaleDto } from './dto/dagro-micro-market.dto';

@ApiTags('dagro-micro-market')
@Controller()
export class DagroMicroMarketController {
  private readonly httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://dagro-micro-market:3000/api/');
  }

  @Get('dagro-market/health')
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

  @Post('/featured')
  @ApiOperation({ description: 'user create description' })
  @HttpCode(HttpStatus.OK)
  async registerFeatured(@Body() body: RegisterInteractionDto) {
    try {
      const { data } = await this.httpClient.request({
        method: 'POST',
        path: `featured`,
        body,
      });

      if (!data) {
        throw new InternalServerErrorException('Failed to register featured');
      }

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Get('featured')
  @ApiQuery({ name: 'user', required: true, type: String, description: 'User' })
  async getFeatured(@Query('user') user?: string) {
    try {
      const { data } = await this.httpClient.request({
        method: 'GET',
        path: `featured`,
        params: {
          user,
        },
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Post('/purchase')
  @ApiOperation({ description: 'register purchase' })
  @HttpCode(HttpStatus.OK)
  async registerPurchase(@Body() body: RegisterSaleDto) {
    try {
      const { data } = await this.httpClient.request({
        method: 'POST',
        path: `purchase`,
        body,
      });

      if (!data) {
        throw new InternalServerErrorException('Failed to register purchase');
      }

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Get('purchase')
  @ApiQuery({ name: 'user', required: true, type: String, description: 'getPuchases' })
  async getPuchases(@Query('user') user?: string) {
    try {
      const { data } = await this.httpClient.request({
        method: 'GET',
        path: `purchase`,
        params: {
          user,
        },
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }
}
