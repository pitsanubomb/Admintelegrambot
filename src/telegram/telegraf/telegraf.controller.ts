import { UserService } from '../../users/user.service';
import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TelegrafService } from './telegraf.service';

@Controller('telegram')
export class TelegrafController {
  constructor(
    private readonly telegraf: TelegrafService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async postData(@Body() data: any) {
    try {
      await this.userService.findUserById(data.id);
      return this.telegraf.sendMessage(data.id, data.message);
    } catch (error) {
      throw new HttpException(
        { messsage: `ไม่สามารถส่งข้อความได้`, error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(`html`)
  async postDataHTml(@Body() data: any) {
    try {
      await this.userService.findUserById(data.id);
      return this.telegraf.sendHTMLMessage(data.id, data.message);
    } catch (error) {
      throw new HttpException(
        { messsage: `ไม่สามารถส่งข้อความได้`, error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(`image`)
  async postDataImage(@Body() data: any) {
    try {
      await this.userService.findUserById(data.id);
      return this.telegraf.sendImageMessage(
        data.id,
        data.image,
        data.show,
        data.button,
      );
    } catch (error) {
      throw new HttpException(
        { messsage: `ไม่สามารถส่งข้อความได้`, error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
