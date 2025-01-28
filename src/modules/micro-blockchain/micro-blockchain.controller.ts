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
  BadRequestException,
  Patch,
  Delete,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ExceptionHandler } from 'src/helpers/handlers/exception.handler';
import { AuthGuard } from 'src/helpers/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpClient } from 'src/shared/http/http.client';
import {
  CancelLimitOrderDto,
  ConnectPosLinkDto,
  CreatePaymentRequestDto,
  CreatePosLinkDto,
  CreatePosSettingsDto,
  CreateSpotMarketDto,
  GetAmountMinMaxDto,
  IsAddressDto,
  PaymentRequestPayDto,
  PreviewSpotMarketDto,
  PreviewSwapDto,
  SwapDto,
  TransferDto,
  TransferNftDto,
  TransferTokenDto,
  UpdatePosLinkDto,
  UpdatePosSettingsDto,
} from './dto/micro-blockchain.dto';
import { AxiosRequestConfig } from 'axios';
import { BooleanValidationPipe } from 'src/helpers/pipes/boolean-validate.pipe';
import { AuthPkGuard } from 'src/helpers/guards/auth-pk.guard';
import { Response } from 'express';

export enum SpotMarketStatusEnum {
  PENDING = 'Pendiente',
  COMPLETED = 'Completado',
  FAILED = 'Fallido',
  SCHEDULED = 'Programado',
  CANCELED = 'Cancelado',
  PROCESSING = 'Procesando',
}

export enum OrderTypeEnum {
  MARKET = 'MARKET',
  LIMIT = 'LIMIT',
}

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

  @Get('tokens')
  @ApiOperation({ description: 'getTokens description' })
  async getTokens() {
    try {
      const { data } = await this.httpClient.request({
        method: 'GET',
        path: `network`,
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

  @Get('balance')
  @ApiOperation({ description: 'Balance endpoint with optional filter by balance status' })
  @ApiQuery({ name: 'network', type: String, required: true, description: 'Network identifier' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async getBalance(@Body('userId') userId: string, @Query('network') network: string) {
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

  @Get('balance-token')
  @ApiOperation({ description: 'Get balance for a specific token' })
  @ApiQuery({ name: 'network', type: String, required: true, description: 'Network identifier' })
  @ApiQuery({ name: 'token', type: String, required: true, description: 'Token identifier' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async getBalanceToken(
    @Body('userId') userId: string,
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

  // @Get('balances/:userId')
  @Get('balances')
  @ApiQuery({ name: 'hasBalance', type: Boolean, required: false, description: 'Filter by have balance' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async getBalances(
    @Body('userId') userId: string,
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
  @UseGuards(AuthPkGuard)
  @ApiBearerAuth()
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
  @UseGuards(AuthPkGuard)
  @ApiBearerAuth()
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
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
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
  @UseGuards(AuthPkGuard)
  @ApiBearerAuth()
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

  @Post('preview-spot-market')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async previewSpotMarket(@Body() body: PreviewSpotMarketDto) {
    try {
      const { data } = await this.httpClient.request({
        method: 'POST',
        path: `spot-market/preview-spot-market`,
        body,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Post('create-spot-market')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthPkGuard)
  @ApiBearerAuth()
  async createSpotMarket(@Body() body: CreateSpotMarketDto) {
    try {
      const { data } = await this.httpClient.request({
        method: 'POST',
        path: `spot-market/create-spot-market`,
        body,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Post('cancel-limit-order')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async cancelLimitOrder(@Body() body: CancelLimitOrderDto) {
    try {
      const { data } = await this.httpClient.request({
        method: 'POST',
        path: `spot-market/cancel-limit-order`,
        body,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Get('user-spot-markets')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiQuery({ name: 'status', required: false, enum: SpotMarketStatusEnum, description: 'Estado del mercado spot' })
  @ApiQuery({ name: 'fromNetwork', required: false, type: String, description: 'Red de origen' })
  @ApiQuery({ name: 'toNetwork', required: false, type: String, description: 'Red de destino' })
  @ApiQuery({ name: 'fromCoin', required: false, type: String, description: 'Moneda de origen' })
  @ApiQuery({ name: 'toCoin', required: false, type: String, description: 'Moneda de destino' })
  @ApiQuery({ name: 'orderType', required: false, enum: OrderTypeEnum, description: 'Tipo de orden' })
  @ApiQuery({
    name: 'startDate',
    required: false,
    type: String,
    description: 'Fecha de inicio',
    example: '2024-12-01T17:20:48.111Zs o 2024-12-01',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    type: String,
    description: 'Fecha de fin',
    example: '2024-12-01T17:20:48.111Zs o 2024-12-01',
  })
  @ApiQuery({ name: 'csv', required: false, type: Boolean, description: 'Exportar a CSV', example: 'true' })
  async getUserSpotMarkets(
    @Res() res: Response,
    @Body('userId') userId: string,
    @Query('status') status?: string,
    @Query('fromNetwork') fromNetwork?: string,
    @Query('toNetwork') toNetwork?: string,
    @Query('fromCoin') fromCoin?: string,
    @Query('toCoin') toCoin?: string,
    @Query('orderType') orderType?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('csv') csv?: boolean,
  ) {
    try {
      const { data } = await this.httpClient.request({
        method: 'GET',
        path: `spot-market/user-spot-markets`,
        params: {
          userId,
          status,
          fromNetwork,
          toNetwork,
          fromCoin,
          toCoin,
          orderType,
          startDate,
          endDate,
          csv,
        },
      });

      if (csv) {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="spot_markets.csv"');
        res.status(HttpStatus.OK).send(data);
        return;
      }

      res.json(data);
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Post('pos/settings')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async createPosSettings(@Body() body: CreatePosSettingsDto) {
    try {
      const { data } = await this.httpClient.request({
        method: 'POST',
        path: `pos/settings`,
        body,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Patch('pos/settings')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async updatePosSettings(@Body() body: UpdatePosSettingsDto) {
    try {
      const { userId, ...restBody } = body;

      if (!userId) {
        throw new BadRequestException('userId is required');
      }

      const { data } = await this.httpClient.request({
        method: 'PATCH',
        path: `pos/settings/${userId}`,
        body: restBody,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Get('pos/settings')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async getPosSettings(@Body('userId') userId: string) {
    try {
      const { data } = await this.httpClient.request({
        method: 'GET',
        path: `pos/settings/${userId}`,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Post('pos/link')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async createPosLink(@Body() body: CreatePosLinkDto) {
    try {
      const { data } = await this.httpClient.request({
        method: 'POST',
        path: `pos/link`,
        body,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Post('pos/link/connect')
  @HttpCode(HttpStatus.OK)
  async connectPosLink(@Body() body: ConnectPosLinkDto) {
    try {
      const { data } = await this.httpClient.request({
        method: 'POST',
        path: `pos/link/connect`,
        body,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Patch('pos/link/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async updatePosLink(@Param('id') id: string, @Body() body: UpdatePosLinkDto) {
    try {
      const { userId, ...restBody } = body;

      if (!userId) {
        throw new BadRequestException('userId is required');
      }

      const { data } = await this.httpClient.request({
        method: 'PATCH',
        path: `pos/link/${id}`,
        body: restBody,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Get('pos/link')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async getPosLinkByUserId(@Body('userId') userId: string) {
    try {
      const { data } = await this.httpClient.request({
        method: 'GET',
        path: `pos/link-by-user-id/${userId}`,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Delete('pos/link/:userId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async deletePosLink(@Param('userId') userId: string) {
    try {
      const { data } = await this.httpClient.request({
        method: 'DELETE',
        path: `pos/link/${userId}`,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Get('pos/link/linked/:userId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async getPosLinkLinked(@Param('userId') userId: string) {
    try {
      const { data } = await this.httpClient.request({
        method: 'GET',
        path: `pos/link/linked/${userId}`,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Get('pos/link/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async getPosLink(@Param('id') id: string) {
    try {
      const { data } = await this.httpClient.request({
        method: 'GET',
        path: `pos/link/${id}`,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Post('pos/payment-request')
  @HttpCode(HttpStatus.OK)
  async createPaymentRequest(@Body() body: CreatePaymentRequestDto) {
    try {
      const { data } = await this.httpClient.request({
        method: 'POST',
        path: `pos/payment-request`,
        body,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Post('pos/payment-request/pay')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthPkGuard)
  @ApiBearerAuth()
  async paymentRequestPay(@Body() body: PaymentRequestPayDto) {
    try {
      const { data } = await this.httpClient.request({
        method: 'POST',
        path: `pos/payment-request/pay`,
        body,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Post('pos/payment-request/amount-min-max')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async getAmountMinMax(@Body() body: GetAmountMinMaxDto) {
    try {
      const { data } = await this.httpClient.request({
        method: 'POST',
        path: `pos/payment-request/amount-min-max`,
        body,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Get('pos/payment-request/:userId')
  @HttpCode(HttpStatus.OK)
  async deletePaymentRequest(@Param('userId') userId: string) {
    try {
      const { data } = await this.httpClient.request({
        method: 'GET',
        path: `pos/payment-request/${userId}`,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Post('nft/transfer')
  @ApiOperation({ description: 'Transfer NFT endpoint' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthPkGuard)
  @ApiBearerAuth()
  async transferNft(@Body() body: TransferNftDto) {
    try {
      const { data } = await this.httpClient.request({
        method: 'POST',
        path: `blockchain/transfer-nft`,
        body,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }
}
