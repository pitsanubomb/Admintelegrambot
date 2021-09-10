import { TelegramuserDTO } from '../dto/telegramuser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Telegramuser } from '../entity/telegramuser.entity';
import { throws } from 'assert';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Telegramuser)
    private readonly teleUserrepo: Repository<Telegramuser>,
  ) {}

  async addUser(user: TelegramuserDTO): Promise<any> {
    try {
      return await this.teleUserrepo.save(user);
    } catch (error) {
      throws(error);
    }
  }

  async findUserById(id: number): Promise<any> {
    try {
      return await this.teleUserrepo.findOneOrFail({ where: { id: id } });
    } catch (error) {
      throws(error);
    }
  }
}
