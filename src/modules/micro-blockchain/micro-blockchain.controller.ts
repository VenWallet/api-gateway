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
  Param,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ExceptionHandler } from 'src/helpers/handlers/exception.handler';
import { AuthGuard } from 'src/helpers/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpClient } from 'src/shared/http/http.client';
import { IsAddressDto, PreviewSwapDto, SwapDto, TransferDto, TransferTokenDto } from './dto/micro-blockchain.dto';
import { AxiosRequestConfig } from 'axios';
import { BooleanValidationPipe } from 'src/helpers/pipes/boolean-validate.pipe';

@ApiTags('micro-blockchain')
@Controller()
export class MicroBlockchainController {
  private readonly httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://micro-blockchain:3000/api/');
  }

  @Get('blockchain/health')
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

  @Post('is-address')
  @ApiOperation({ description: 'is address description' })
  @HttpCode(HttpStatus.OK)
  async isAddress(@Body() body: IsAddressDto) {
    try {
      const { data } = await this.httpClient.request({
        method: 'POST',
        path: `blockchain/is-address`,
        body,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Get('balance/:userId')
  @ApiOperation({ description: 'Balance endpoint with optional filter by balance status' })
  @ApiQuery({ name: 'network', type: String, required: true, description: 'Network identifier' })
  async getBalance(@Param('userId') userId: string, @Query('network') network: string) {
    try {
      const config: AxiosRequestConfig = {
        params: {
          network,
        },
      };

      const { data } = await this.httpClient.request({
        method: 'GET',
        path: `blockchain/balance/${userId}`,
        config,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Get('balance-token/:userId')
  @ApiOperation({ description: 'Get balance for a specific token' })
  @ApiQuery({ name: 'network', type: String, required: true, description: 'Network identifier' })
  @ApiQuery({ name: 'token', type: String, required: true, description: 'Token identifier' })
  async getBalanceToken(
    @Param('userId') userId: string,
    @Query('network') network: string,
    @Query('token') token: string,
  ) {
    try {
      const config: AxiosRequestConfig = {
        params: {
          network,
          token,
        },
      };

      const { data } = await this.httpClient.request({
        method: 'GET',
        path: `blockchain/balance-token/${userId}`,
        config,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Get('balances/:userId')
  @ApiQuery({ name: 'hasBalance', type: Boolean, required: false, description: 'Filter by have balance' })
  async getBalances(
    @Param('userId') userId: string,
    @Query('hasBalance', new BooleanValidationPipe()) hasBalance?: boolean | string,
  ) {
    try {
      const config: AxiosRequestConfig = {
        params: {
          hasBalance,
        },
      };

      const { data } = await this.httpClient.request({
        method: 'GET',
        path: `blockchain/balances/${userId}`,
        config,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Post('transfer')
  @ApiOperation({ description: 'Transfer endpoint' })
  @HttpCode(HttpStatus.OK)
  async transfer(@Body() body: TransferDto) {
    try {
      const { data } = await this.httpClient.request({
        method: 'POST',
        path: `blockchain/transfer`,
        body,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Post('transfer-token')
  @HttpCode(HttpStatus.OK)
  async transferToken(@Body() body: TransferTokenDto) {
    try {
      const { data } = await this.httpClient.request({
        method: 'POST',
        path: `blockchain/transfer-token`,
        body,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Post('preview-swap')
  @HttpCode(HttpStatus.OK)
  async previewSwap(@Body() body: PreviewSwapDto) {
    try {
      const { data } = await this.httpClient.request({
        method: 'POST',
        path: `blockchain/preview-swap`,
        body,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Post('swap')
  @HttpCode(HttpStatus.OK)
  async swap(@Body() body: SwapDto) {
    try {
      const { data } = await this.httpClient.request({
        method: 'POST',
        path: `blockchain/swap`,
        body,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }
}
