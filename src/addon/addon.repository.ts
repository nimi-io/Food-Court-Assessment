import { Injectable } from '@nestjs/common';
import { AbstractService } from '../shared/common/abstract/abstract.service';
import Addon from './entities/addon.entity';

@Injectable()
export class AddonRepository extends AbstractService<Addon> {
  constructor() {
    super(Addon, 'Addon');
  }
}
