import { TelegrafUpdateService } from './telegraf.update.serivce';
import { TelegrafService } from './telegraf.service';
import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegrafController } from './telegraf.controller';
import { UserService } from '../../users/user.service';
import { Telegraf } from 'telegraf';
import { UserModule } from 'src/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Telegramuser } from 'src/users/entity/telegramuser.entity';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: `1999148298:AAFAU6RA01AvwqPrMWvgEhRA_dPDPDlZmMs`,
    }),
    TypeOrmModule.forFeature([Telegramuser]),
    Telegraf,
    UserModule,
  ],
  controllers: [TelegrafController],
  providers: [TelegrafService, TelegrafUpdateService, UserService],
})
export class TelegramModule {}
