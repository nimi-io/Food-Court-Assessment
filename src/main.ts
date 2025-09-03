import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { Logger as logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ResultInterceptor } from './shared/interceptors/result.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new ResultInterceptor());

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Food City Assessment API')
    .setDescription('API documentation for Food City Assessment application')
    .setVersion('1.0')
    .addTag('api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);

    logger.log(
      `\n\nSwagger documentation available at: ${await app.getUrl()}/api/docs\n\n`,
    );

  logger.log(
    `\n\n\n 🚀🚀🚀 - - - Application is running on: ${await app.getUrl()} - - - 🚀🚀🚀\n\n\n`,
  );

}
bootstrap();
