import { Module } from '@nestjs/common';
import { AddonService } from './addon.service';
import { AddonController } from './addon.controller';
import { AddonRepository } from './addon.repository';

@Module({
  controllers: [AddonController],
  providers: [AddonService, AddonRepository],
})
export class AddonModule {}
