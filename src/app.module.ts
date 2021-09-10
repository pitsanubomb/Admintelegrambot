import { Telegraf } from './telegram/telegraf/telegraf.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(), Telegraf],
})
export class AppModule {}
