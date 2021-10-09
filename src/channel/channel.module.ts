import { Channel } from './entity/channel.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelService } from './channel.service';

@Module({
  imports: [TypeOrmModule.forFeature([Channel])],
  controllers: [],
  providers: [ChannelService],
  exports: [ChannelService],
})
export class ChannelModule {}
