import { Telegraf } from './telegram/telegraf/telegraf.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [Telegraf],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
