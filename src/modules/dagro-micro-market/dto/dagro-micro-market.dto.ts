import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsEnum, IsNumber, IsEmail, IsInt } from 'class-validator';

export class RegisterInteractionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contract!: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  user: string;

  @ApiProperty({ description: 'views / clicks' })
  @IsNotEmpty()
  @IsString()
  interactionType!: string;
}

export class RegisterSaleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contract!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  quantity: number;
}

export class CategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;
}

export class UpdateCategoryDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;
}

export class ProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateProductDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;
}

export class PackingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;
}

export class UpdatePackingDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;
}
