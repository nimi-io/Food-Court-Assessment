import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configModuleOpts } from './shared/config/index.config';
import { LoggerModule } from 'nestjs-pino';
import { loggerModuleOpts } from './shared/config/logger.config';
import { DatabaseProvider } from './shared/config/database.config';
import { OrderModule } from './order/order.module';

// @Global()
@Module({
  imports: [
    LoggerModule.forRootAsync(loggerModuleOpts),
    ConfigModule.forRoot(configModuleOpts),
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseProvider],
  // exports: [DatabaseProvider],
})
export class AppModule {}
