import './components/config.loader';
import * as helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './modules/app/app.module';

async function setupSwaggerDocs(app) {
  const options = new DocumentBuilder()
    .setTitle('Trading Platform')
    .setDescription('The trading platform API description')
    .setVersion('1.0')
    .setBasePath('/api')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<INestApplication>(AppModule);

  app.setGlobalPrefix('api');
  app.use(helmet());
  app.enableCors();

  await setupSwaggerDocs(app);
  await app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST);
}

bootstrap();
