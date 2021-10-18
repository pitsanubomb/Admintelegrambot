import { Channel } from './entity/channel.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { Message } from './entity/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Channel, Message])],
  controllers: [ChannelController],
  providers: [ChannelService],
  exports: [ChannelService],
})
export class ChannelModule {}
