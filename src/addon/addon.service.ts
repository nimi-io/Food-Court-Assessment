import { Injectable } from '@nestjs/common';
import { CreateAddonDto } from './dto/create-addon.dto';
import { UpdateAddonDto } from './dto/update-addon.dto';
import { AddonRepository } from './addon.repository';

@Injectable()
export class AddonService {
  constructor(private readonly addonRepository: AddonRepository) {}

  create(createAddonDto: CreateAddonDto) {
    return 'This action adds a new addon';
  }

  findAll() {
    return `This action returns all addon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} addon`;
  }

  update(id: number, updateAddonDto: UpdateAddonDto) {
    return `This action updates a #${id} addon`;
  }

  remove(id: number) {
    return `This action removes a #${id} addon`;
  }
}
