import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configModuleOpts } from './shared/config/index.config';
import { LoggerModule } from 'nestjs-pino';
import { loggerModuleOpts } from './shared/config/logger.config';

@Module({
  imports: [
    LoggerModule.forRootAsync(loggerModuleOpts),
    ConfigModule.forRoot(configModuleOpts),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
