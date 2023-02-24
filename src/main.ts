import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const options = new DocumentBuilder() 
    .setTitle('CIDENET Empleados REST API')
    .setDescription('API REST para la gestión de empleados de la compañia Cidenet')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options); 

  // Path that documentation is served
  SwaggerModule.setup('docs', app, document); 

  await app.listen(3000);
}
bootstrap();
