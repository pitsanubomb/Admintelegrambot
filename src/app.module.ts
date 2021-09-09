import { Telegraf } from './telegram/telegraf/telegraf.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(), Telegraf],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
