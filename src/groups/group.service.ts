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

  async findGroupById(groupId: string | number): Promise<any> {
    try {
      return await this.teleGrouprepo.findOneOrFail({ where: { id: groupId } });
    } catch (error) {}
  }

  async findAll(): Promise<any> {
    try {
      const [res, count] = await this.teleGrouprepo.findAndCount();
      return { data: res, count: count };
    } catch (error) {
      throws(error);
    }
  }

  async findAndEdit(groupId: number, name: string): Promise<any> {
    try {
      return await this.teleGrouprepo.update(
        { id: groupId },
        { groupname: name },
      );
    } catch (error) {}
  }

  async findAndEditId(groupId: number, editId: number): Promise<any> {
    try {
      return await this.teleGrouprepo.update({ id: groupId }, { id: editId });
    } catch (error) {}
  }

  async removeGroup(groupId: number): Promise<any> {
    try {
      return await this.teleGrouprepo.delete({ id: groupId });
    } catch (error) {}
  }
}
