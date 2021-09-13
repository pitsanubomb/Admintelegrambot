import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throws } from 'assert';
import { Repository } from 'typeorm/repository/Repository';
import { TelegramgroupDTO } from './dto/telegramgroup.dto';
import { Telegramgroup } from './entity/group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Telegramgroup)
    private readonly teleGrouprepo: Repository<Telegramgroup>,
  ) {}

  async addGroup(group: TelegramgroupDTO): Promise<any> {
    try {
      return await this.teleGrouprepo.save(group);
    } catch (error) {
      throws(error);
    }
  }

  async findGroupById(groupId: number): Promise<any> {
    try {
      return await this.teleGrouprepo.findOneOrFail({ where: { id: groupId } });
    } catch (error) {}
  }
}
