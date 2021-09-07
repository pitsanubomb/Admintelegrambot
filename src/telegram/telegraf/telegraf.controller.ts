import { Body, Controller, Post } from '@nestjs/common';
import { TelegrafService } from './telegraf.service';

@Controller('telegram')
export class TelegrafController {
  constructor(private readonly telegraf: TelegrafService) {}

  @Post()
  postData(@Body() data: any) {
    this.telegraf.sendMessage(data.id, data.message);
  }

  @Post(`html`)
  postDataHTml(@Body() data: any) {
      this.telegraf.sendHTMLMessage(data.id, data.message);
  }
  @Post(`image`)
  postDataImage(@Body() data: any) {
      this.telegraf.sendImageMessage(data.id, data.image);
  }
}
