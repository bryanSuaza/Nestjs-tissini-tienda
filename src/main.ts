import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // no elimina los campos extras
      forbidNonWhitelisted: true // alerta sobre los campos extras
    }),
  );

    const config = new DocumentBuilder()
      .setTitle('API Tissini tienda')
      .setDescription('Curso tissini tienda')
      .setVersion('1.0')
      .addTag('default')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

  app.enableCors(); // abrir la piticiones desde cualquier lugar o podemos enviarle por parametro las url desde las que permitiremos las peticiones
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
