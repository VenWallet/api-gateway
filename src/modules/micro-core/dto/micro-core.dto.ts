import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsEnum, IsNumber, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  copydrive: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mnemonic: string;
}

export class ImportUserFromMnemonicDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mnemonic: string;

  // @ApiProperty()
  // @IsString()
  // @IsNotEmpty()
  // userId: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class GenerateOtpDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class ValidateOtpDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  otp: string;
}
