import { NestFactory } from '@nestjs/core';
import { getBotToken } from 'nestjs-telegraf';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const bot = app.get(getBotToken())
  await app.listen(3000);
}
bootstrap();
