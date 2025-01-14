import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { ResponseInterceptor } from './helpers/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const configService = app.get(ConfigService<EnvironmentVariables>);

  const port = 3000;

  app.use(morgan('dev'));
  app.enableCors();

  app.setGlobalPrefix('/venwallet/api/v1');

  const config = new DocumentBuilder()
    .setTitle(`API Gateway V1 - ${process.env.NODE_ENV}`)
    .setDescription('API Gateway Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('venwallet/api/v1/swagger', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(port);

  const url = await app.getUrl();

  console.log(`Server is running on ${url}`);
}

bootstrap();
