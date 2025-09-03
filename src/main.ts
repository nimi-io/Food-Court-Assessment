import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import {
  Logger as logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ResultInterceptor } from './shared/interceptors/result.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);

  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new ResultInterceptor());

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
  });

  // app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Food Court Assessment API')
    .setDescription('API documentation for Food Court Assessment application')
    .setVersion('1.0')
    .addTag('api')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  const port = configService.get('port');
  await app.listen(port);

  logger.log(
    `\n\nSwagger documentation available at: ${await app.getUrl()}/docs\n\n`,
  );

  logger.log(
    `\n\n\n 🚀🚀🚀 - - - Application is running on: ${await app.getUrl()} - - - 🚀🚀🚀\n\n\n`,
  );
}
bootstrap();
