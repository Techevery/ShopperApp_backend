import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
      cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true    
    }
  });
  app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
    .setTitle('Quick mall')  // e.g., 'User Profile API'
    .setDescription('Api for quick mall store')
    .setVersion('1.0')
    .addBearerAuth()  // For JWT auth endpoints
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); 

  app.setGlobalPrefix("api")

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
