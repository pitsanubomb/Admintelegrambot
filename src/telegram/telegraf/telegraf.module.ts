import { TelegrafUpdate } from './telegraf.update';
import { TelegrafService } from './telegraf.service';
import { Module } from "@nestjs/common";
import { TelegrafModule } from "nestjs-telegraf";
import { TelegrafController } from './telegraf.controller';

@Module({
    imports: [TelegrafModule.forRoot({
        token:`1999148298:AAFAU6RA01AvwqPrMWvgEhRA_dPDPDlZmMs`
    }),TelegrafUpdate,Telegraf],
    controllers: [TelegrafController],
    providers: [TelegrafService]
})

export class Telegraf {}