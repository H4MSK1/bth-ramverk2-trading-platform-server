import './components/config.loader';
import * as helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './modules/app/app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<INestApplication>(AppModule);

  app.setGlobalPrefix('api');
  app.use(helmet());
  app.enableCors();

  await app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST);
}

bootstrap();
