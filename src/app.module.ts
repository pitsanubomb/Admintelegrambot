import { Telegraf } from './telegram/telegraf/telegraf.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    Telegraf,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-54-147-126-173.compute-1.amazonaws.com',
      port: 5432,
      username: 'rjdhlfwaqxpncv',
      password: '304aefa7acdaf02adc7fe306798538e5ee44d5d02387ed023dc66dc60e1b1d18',
      database: 'dafsck06itqjrd',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
