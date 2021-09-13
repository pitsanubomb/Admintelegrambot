import { GroupService } from './group.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Telegramgroup } from './entity/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Telegramgroup])],
  providers:[GroupService],
  exports: [GroupService],
})
export class GroupModule {}
