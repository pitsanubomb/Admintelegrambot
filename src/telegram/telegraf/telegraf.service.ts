import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Markup, Telegraf } from 'telegraf';

@Injectable()
export class TelegrafService {
  constructor(@InjectBot() private bot: Telegraf<any>) {}

  createButton(obj: Object, show: number) {
    const but = Object.keys(obj).map((key) => Markup.button.url(key, obj[key]));
    return Markup.inlineKeyboard(but, { columns: show });
  }

  sendMessage(id: string | number, message: string) {
    return this.bot.telegram.sendMessage(id, message);
  }

  sendHTMLMessage(id: string | number, message: string) {
    return this.bot.telegram.sendMessage(id, `${message}`, {
      parse_mode: 'HTML',
    });
  }

  sendImageMessage(
    id: string | number,
    img: string,
    show: number,
    data: Object,
  ) {
    return this.bot.telegram.sendPhoto(id, img, this.createButton(data, show));
  }

  getMe() {
    return this.bot.telegram.getMe();
  }

  async getInfoChat(id: string | number) {
    try {
      return await this.bot.telegram.getChat(id);
    } catch (error) {
      throw new HttpException(
        { message: error.response },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
