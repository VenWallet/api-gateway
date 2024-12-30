import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsEnum,
  IsNumber,
  ValidateNested,
  IsArray,
  Min,
  IsOptional,
} from 'class-validator';

export class IsAddressDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  network: string;
}

export class TransferDto {
  // @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  // @ApiProperty()
  @IsString()
  @IsNotEmpty()
  privateKey: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  network: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  toAddress: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

export class TransferTokenDto {
  // @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  // @ApiProperty()
  @IsString()
  @IsNotEmpty()
  privateKey: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  network: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  toAddress: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token: string;
}

export class PreviewSwapDto {
  // @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fromCoin: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  toCoin: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  network: string;
}

export class PriceRouteDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  tokenIn: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  tokenOut: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  amountIn: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  minAmountOut: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  txMain: any[];

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  networkId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fromToken: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  toToken: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

export class SwapDto {
  // @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  // @ApiProperty()
  @IsString()
  @IsNotEmpty()
  privateKey: string;

  @ApiProperty({ type: PriceRouteDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PriceRouteDto)
  priceRoute: PriceRouteDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  network: string;
}

export class PreviewSpotMarketDto {
  // @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  typeOrder: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fromNetwork: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  toNetwork: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fromCoin: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  toCoin: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0.0000001, { message: 'The amount must be greater than 0' })
  amount: number;
}

export class CreateSpotMarketDto extends PreviewSpotMarketDto {
  // @ApiProperty()
  @IsString()
  @IsNotEmpty()
  privateKey: string;
}

export class CreatePosSettingsDto {
  // @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  network: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  token: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  network_ext: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  token_ext: string;
}

export class UpdatePosSettingsDto {
  // @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  network: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  token: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  network_ext: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  token_ext: string;
}

export class CreatePosLinkDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description: string;
}

export class PosLinkDto extends CreatePosLinkDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  image: string;
}

export class UpdatePosLinkDto extends PartialType(PosLinkDto) {}

export class ConnectPosLinkDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  posLinkId: string;
}

export class CreatePaymentRequestDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  network: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  token: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  note: string;
}

export class PaymentRequestPayDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  privateKey: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  paymentRequestId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  network: string;
}
