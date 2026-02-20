import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('API description goes here')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addTag('products') // ← add your own tags
    // Important: this enables the "Authorize" button for JWT
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token (without Bearer prefix)',
        in: 'header',
      },
      'access-token', // ← this is the security scheme name you'll reference later
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    // Nice defaults — optional but recommended
    swaggerOptions: {
      persistAuthorization: true,     // keeps token after refresh
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      docExpansion: 'none',
    },
    customCss: '.swagger-ui .topbar { display: none }', // optional: hide top bar
  });

  app.setGlobalPrefix("api")

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
