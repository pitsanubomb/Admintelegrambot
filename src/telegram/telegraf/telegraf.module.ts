import { TelegrafUpdateService } from './telegraf.update.serivce';
import { TelegrafService } from './telegraf.service';
import { Module } from "@nestjs/common";
import { TelegrafModule } from "nestjs-telegraf";
import { TelegrafController } from './telegraf.controller';
import { UserService } from './user.service';
import { Telegramuser } from '../entity/telegramuser.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Telegramuser]),TelegrafModule.forRoot({
        token:`1999148298:AAFAU6RA01AvwqPrMWvgEhRA_dPDPDlZmMs`
    }),Telegraf],
    controllers: [TelegrafController],
    providers: [TelegrafService,TelegrafUpdateService,UserService]
})

export class Telegraf {}