import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsEnum, IsNumber } from 'class-validator';

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

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  pkEncrypt: string;

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

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  pkEncrypt: string;

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
  @ApiProperty()
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

export class SwapDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  priceRoute: any;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  pkEncrypt: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  network: string;

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
}
