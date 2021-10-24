import { Message } from './entity/message.entity';
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
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async addChannel(channel: channelDTO) {
    try {
      this.channelRepository.save(channel);
    } catch (error) {}
  }

  async findAllChannel() {
    try {
      const [res, cout] = await this.channelRepository.findAndCount();
      return { data: res, total: cout };
    } catch (error) {
      throw new HttpException(
        { message: `ไม่สามารถค้นหาชาแนลได้`, error: error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findMessageByChannelId(id: string | number) {
    try {
      return await this.channelRepository.findOneOrFail({
        where: { id: id },
        relations: ['messages'],
      });
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

  async addMessage(id: string | number, message: string, mid: number) {
    try {
      let channel = await this.findMessageByChannelId(id);
      const m: any = await this.messageRepository.save({
        message: message,
        mid: mid,
      });
      channel.messages.push(m);
      await this.channelRepository.save(channel);
    } catch (error) {}
  }
}
