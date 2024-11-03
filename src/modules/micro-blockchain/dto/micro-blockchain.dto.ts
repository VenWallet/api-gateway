import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsUUID, IsEnum, IsNumber, ValidateNested, IsArray } from 'class-validator';

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
