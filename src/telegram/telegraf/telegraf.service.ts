import { Injectable } from '@nestjs/common';
import { Markup, Telegram } from 'telegraf';
import { button } from 'telegraf/typings/markup';

@Injectable()
export class TelegrafService {
  public bot = new Telegram(`1999148298:AAFAU6RA01AvwqPrMWvgEhRA_dPDPDlZmMs`);

  createButton() {
    return Markup.inlineKeyboard([
        Markup.button.url(`Google`, `https://www.google.com`),
        Markup.button.url(`xxxx`, `https://www.google.com`),
    ]);
  }

  sendMessage(id: string, message: string) {
    this.bot.sendMessage(id, message);
  }

  sendHTMLMessage(id: string, message: string) {
    console.log(message);
    this.bot.sendMessage(id, `${message}`, { parse_mode: 'HTML' });
  }

  sendImageMessage(id: string | number, img: string) {
    this.bot.sendPhoto(id, img, this.createButton());
  }
}
