import { GroupModule } from './../../groups/group.module';
import { TelegrafService } from './telegraf.service';
import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegrafController } from './telegraf.controller';
import { UserService } from '../../users/user.service';
import { Telegraf } from 'telegraf';
import { UserModule } from 'src/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Telegramuser } from 'src/users/entity/telegramuser.entity';
import { AutoUpdateService } from '../auto/autoupdate.serivce';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: `1999148298:AAFAU6RA01AvwqPrMWvgEhRA_dPDPDlZmMs`,
    }),
    TypeOrmModule.forFeature([Telegramuser]),
    Telegraf,
    UserModule,
    GroupModule,
  ],
  controllers: [TelegrafController],
  providers: [TelegrafService, AutoUpdateService, UserService],
})
export class TelegramModule {}
