import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configModuleOpts } from './shared/config/index.config';

@Module({
  imports: [ConfigModule.forRoot(configModuleOpts)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
