import { UploadeModule } from './../../upload/upload.module';
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
import { ChannelModule } from 'src/channel/channel.module';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: `1911741281:AAFadVLZx6WgF_0pRtsb_KsL2ca3gvVtsvQ`,
    }),
    TypeOrmModule.forFeature([Telegramuser]),
    Telegraf,
    UserModule,
    GroupModule,
    ChannelModule,
    UploadeModule,
  ],
  controllers: [TelegrafController],
  providers: [TelegrafService, AutoUpdateService, UserService],
})
export class TelegramModule {}
