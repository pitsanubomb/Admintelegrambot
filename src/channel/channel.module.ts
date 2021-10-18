import { Channel } from './entity/channel.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Channel])],
  controllers: [ChannelController],
  providers: [ChannelService],
  exports: [ChannelService],
})
export class ChannelModule {}
