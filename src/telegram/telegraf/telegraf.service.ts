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

  async sendMessage(id: string | number, message: string) {
    try {
      return await this.bot.telegram.sendMessage(id, message);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
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

  sendMessageGetContact(id: string | number, message: string) {
    return this.bot.telegram.sendMessage(id, `  ${message}`, {
      reply_markup: {
        keyboard: [
          [{ text: `📲 คลิกเพื่อให้ช่องทางการติดต่อ`, request_contact: true }],
        ],
        one_time_keyboard: true,
      },
    });
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
