import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { Logger as logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ResultInterceptor } from './shared/interceptors/result.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new ResultInterceptor());

  await app.listen(process.env.PORT ?? 3000);
  logger.log(
    `🚀🚀🚀 - - - Application is running on: ${await app.getUrl()} - - - 🚀🚀🚀`,
  );
}
bootstrap();
