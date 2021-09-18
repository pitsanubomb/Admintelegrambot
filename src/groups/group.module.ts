import { GroupService } from './group.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Telegramgroup } from './entity/group.entity';
import { GroupController } from './group.controller';
import { TelegrafService } from 'src/telegram/telegraf/telegraf.service';

@Module({
  imports: [TypeOrmModule.forFeature([Telegramgroup])],
  controllers: [GroupController],
  providers: [GroupService, TelegrafService],
  exports: [GroupService],
})
export class GroupModule {}
