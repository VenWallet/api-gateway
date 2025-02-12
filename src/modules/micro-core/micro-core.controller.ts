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
import { CreateUserDto, GenerateOtpDto, ImportUserFromMnemonicDto, ValidateOtpDto } from './dto/micro-core.dto';

export enum StatusEnum {
  PENDING = 'PENDING',
  IN_PROCESS = 'IN_PROCESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export enum MovementTypeEnum {
  LOGIN = 'LOGIN',
  TRANSFER = 'TRANSFER',
  SWAP = 'SWAP',
  BRIDGE = 'BRIDGE',
  WITHDRAWAL = 'WITHDRAWAL',
  DEPOSIT = 'DEPOSIT',
  PURCHASE = 'PURCHASE',
  SALE = 'SALE',
}

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
  @ApiQuery({ name: 'status', required: false, enum: StatusEnum, description: 'Estado del movimiento' })
  @ApiQuery({ name: 'fromNetwork', required: false, type: String, description: 'Red de origen' })
  @ApiQuery({ name: 'toNetwork', required: false, type: String, description: 'Red de destino' })
  @ApiQuery({ name: 'fromCoin', required: false, type: String, description: 'Moneda de origen' })
  @ApiQuery({ name: 'toCoin', required: false, type: String, description: 'Moneda de destino' })
  @ApiQuery({ name: 'movementType', required: false, enum: MovementTypeEnum, description: 'Tipo de movimiento' })
  @ApiQuery({ name: 'currency', required: false, type: String, description: 'Moneda' })
  @ApiQuery({ name: 'fromAccount', required: false, type: String, description: 'Cuenta de origen' })
  @ApiQuery({ name: 'toAccount', required: false, type: String, description: 'Cuenta de destino' })
  @ApiQuery({
    name: 'startDate',
    required: false,
    type: String,
    description: 'Fecha de inicio',
    example: '2024-12-01',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    type: String,
    description: 'Fecha de fin',
    example: '2024-12-01',
  })
  async getMovements(
    @Body('userId') userId: string,
    @Query('status') status?: StatusEnum,
    @Query('fromNetwork') fromNetwork?: string,
    @Query('toNetwork') toNetwork?: string,
    @Query('fromCoin') fromCoin?: string,
    @Query('toCoin') toCoin?: string,
    @Query('movementType') movementType?: MovementTypeEnum,
    @Query('currency') currency?: string,
    @Query('fromAccount') fromAccount?: string,
    @Query('toAccount') toAccount?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    try {
      const { data } = await this.httpClient.request({
        method: 'GET',
        path: `movement/${userId}`,
        params: {
          status,
          fromNetwork,
          toNetwork,
          fromCoin,
          toCoin,
          movementType,
          currency,
          fromAccount,
          toAccount,
          startDate,
          endDate,
        },
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Post('user/generate-otp')
  @HttpCode(HttpStatus.OK)
  async generateOtp(@Body() body: GenerateOtpDto) {
    try {
      const { data } = await this.httpClient.request({
        method: 'POST',
        path: `user/generate-otp`,
        body,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Post('user/validate-otp')
  @HttpCode(HttpStatus.OK)
  async validateOtp(@Body() body: ValidateOtpDto) {
    try {
      const { data } = await this.httpClient.request({
        method: 'POST',
        path: `user/validate-otp`,
        body,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Post('user/exists/:email')
  @HttpCode(HttpStatus.OK)
  async userExists(@Param('email') email: string) {
    try {
      const { data } = await this.httpClient.request({
        method: 'GET',
        path: `user/exists/${email}`,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }
}
