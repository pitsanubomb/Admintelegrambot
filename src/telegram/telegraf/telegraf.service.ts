import { Injectable } from '@nestjs/common';
import { Markup, Telegram } from 'telegraf';
// import { button } from 'telegraf/typings/markup';

@Injectable()
export class TelegrafService {
  public bot = new Telegram(`1999148298:AAFAU6RA01AvwqPrMWvgEhRA_dPDPDlZmMs`);

  createButton(obj: Object, show: number) {
    const but = Object.keys(obj).map((key) =>
      Markup.button.url(key, obj[key]),
    );
    return Markup.inlineKeyboard(but, { columns: show });
  }

  sendMessage(id: string | number, message: string) {
    return this.bot.sendMessage(id, message);
  }

  sendHTMLMessage(id: string | number, message: string) {
    return this.bot.sendMessage(id, `${message}`, { parse_mode: 'HTML' });
  }

  sendImageMessage(
    id: string | number,
    img: string,
    show: number,
    data: Object,
  ) {
    return this.bot.sendPhoto(id, img, this.createButton(data, show));
  }
}
