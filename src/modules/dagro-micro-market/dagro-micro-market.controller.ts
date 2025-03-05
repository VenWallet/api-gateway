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
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ExceptionHandler } from 'src/helpers/handlers/exception.handler';
import { AuthGuard } from 'src/helpers/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpClient } from 'src/shared/http/http.client';
import {
  CategoryDto,
  PackingDto,
  ProductDto,
  RegisterInteractionDto,
  RegisterSaleDto,
  UpdateCategoryDto,
  UpdatePackingDto,
  UpdateProductDto,
} from './dto/dagro-micro-market.dto';
import { ApiKeyGuard } from 'src/helpers/guards/api-key.guard';

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

  @Post('featured')
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

  @Post('purchase')
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

  @Get('product')
  @HttpCode(HttpStatus.OK)
  async getProducts() {
    try {
      const { data } = await this.httpClient.request({
        method: 'GET',
        path: `product`,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Post('product')
  @ApiOperation({ description: 'create product' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('x-api-key')
  async createProduct(@Body() body: ProductDto) {
    try {
      const { data } = await this.httpClient.request({
        method: 'POST',
        path: `product`,
        body,
      });

      if (!data) {
        throw new InternalServerErrorException('Failed to create product');
      }

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Get('product/:id')
  @HttpCode(HttpStatus.OK)
  async getProduct(@Param('id') id: string) {
    try {
      const { data } = await this.httpClient.request({
        method: 'GET',
        path: `product/${id}`,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Patch('product/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('x-api-key')
  async updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto) {
    try {
      const { data } = await this.httpClient.request({
        method: 'PATCH',
        path: `product/${id}`,
        body,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Delete('product/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('x-api-key')
  async deleteProduct(@Param('id') id: string) {
    try {
      const { data } = await this.httpClient.request({
        method: 'DELETE',
        path: `product/${id}`,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Get('category')
  @HttpCode(HttpStatus.OK)
  async getCategories() {
    try {
      const { data } = await this.httpClient.request({
        method: 'GET',
        path: `category`,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Post('category')
  @ApiOperation({ description: 'create category' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('x-api-key')
  async createCategory(@Body() body: CategoryDto) {
    try {
      const { data } = await this.httpClient.request({
        method: 'POST',
        path: `category`,
        body,
      });

      if (!data) {
        throw new InternalServerErrorException('Failed to create category');
      }

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Get('category/:id')
  @HttpCode(HttpStatus.OK)
  async getCategory(@Param('id') id: string) {
    try {
      const { data } = await this.httpClient.request({
        method: 'GET',
        path: `category/${id}`,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Patch('category/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('x-api-key')
  async updateCategory(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
    try {
      const { data } = await this.httpClient.request({
        method: 'PATCH',
        path: `category/${id}`,
        body,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Delete('category/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('x-api-key')
  async deleteCategory(@Param('id') id: string) {
    try {
      const { data } = await this.httpClient.request({
        method: 'DELETE',
        path: `category/${id}`,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Get('packing')
  @HttpCode(HttpStatus.OK)
  async getPackings() {
    try {
      const { data } = await this.httpClient.request({
        method: 'GET',
        path: `packing`,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Post('packing')
  @ApiOperation({ description: 'create packing' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('x-api-key')
  async createPacking(@Body() body: PackingDto) {
    try {
      const { data } = await this.httpClient.request({
        method: 'POST',
        path: `packing`,
        body,
      });

      if (!data) {
        throw new InternalServerErrorException('Failed to create packing');
      }

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Get('packing/:id')
  @HttpCode(HttpStatus.OK)
  async getPacking(@Param('id') id: string) {
    try {
      const { data } = await this.httpClient.request({
        method: 'GET',
        path: `packing/${id}`,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Patch('packing/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('x-api-key')
  async updatePacking(@Param('id') id: string, @Body() body: UpdatePackingDto) {
    try {
      const { data } = await this.httpClient.request({
        method: 'PATCH',
        path: `packing/${id}`,
        body,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  @Delete('packing/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('x-api-key')
  async deletePacking(@Param('id') id: string) {
    try {
      const { data } = await this.httpClient.request({
        method: 'DELETE',
        path: `packing/${id}`,
      });

      return data;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }
}
