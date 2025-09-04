import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configModuleOpts } from './shared/config/index.config';
import { LoggerModule } from 'nestjs-pino';
import { loggerModuleOpts } from './shared/config/logger.config';
import { DatabaseProvider } from './shared/config/database.config';
import { OrderModule } from './order/order.module';
import { OrderLogModule } from './order-log/order-log.module';
import { CalculatedOrderModule } from './calculated-order/calculated-order.module';
import { MealModule } from './meal/meal.module';
import { AddonModule } from './addon/addon.module';
import { BrandModule } from './brand/brand.module';
import { OrderTypeModule } from './order-type/order-type.module';

@Module({
  imports: [
    LoggerModule.forRootAsync(loggerModuleOpts),
    ConfigModule.forRoot(configModuleOpts),
    OrderModule,
    OrderLogModule,
    CalculatedOrderModule,
    MealModule,
    AddonModule,
    BrandModule,
    OrderTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseProvider],
})
export class AppModule {}
