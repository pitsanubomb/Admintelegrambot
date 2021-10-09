import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { channelDTO } from './dto/channel.dto';
import { Channel } from './entity/channel.entity';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
  ) {}

  async addChannel(channel: channelDTO) {
    try {
      this.channelRepository.save(channel);
    } catch (error) {}
  }

  async findAllChannel() {
    try {
      this.channelRepository.findAndCount();
    } catch (error) {
      throw new HttpException(
        { message: `ไม่สามารถค้นหาชาแนลได้`, error: error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findChannelById(id: string | number) {
    try {
      return await this.channelRepository.findOneOrFail({
        where: { id: id },
      });
    } catch (error) {}
  }
}
