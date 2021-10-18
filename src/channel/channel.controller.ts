import { Controller, Get, Param } from '@nestjs/common';
import { ChannelService } from './channel.service';

@Controller(`channel`)
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get('all')
  async getAll(): Promise<any> {
    return await this.channelService.findAllChannel();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<any> {
    return await this.channelService.findChannelById(id);
  }
}
