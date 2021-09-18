import { GroupService } from './../../groups/group.service';
import { UserService } from '../../users/user.service';
import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { TelegrafService } from './telegraf.service';

@Controller('telegram')
export class TelegrafController {
  constructor(
    private readonly telegraf: TelegrafService,
    private readonly userService: UserService,
    private readonly groupService: GroupService,
  ) {}

  @Get('me')
  async getMe() {
    return await this.telegraf.getMe();
  }

  @Post('group')
  async postGroupData(@Body() data: any) {
    await this.telegraf.getInfoChat(data.id);
    await this.groupService.findGroupById(data.id);
    return this.telegraf.sendMessage(data.id, data.message);
  }

  @Post(`group/html`)
  async postgroupDataHTml(@Body() data: any) {
    await this.telegraf.getInfoChat(data.id);
    await this.groupService.findGroupById(data.id);
    return this.telegraf.sendHTMLMessage(data.id, data.message);
  }

  @Post(`group/image`)
  async postgroupDataImage(@Body() data: any) {
    await this.telegraf.getInfoChat(data.id);
    await this.groupService.findGroupById(data.id);
    return this.telegraf.sendImageMessage(
      data.id,
      data.image,
      data.show,
      data.button,
    );
  }

  @Post()
  async postData(@Body() data: any) {
    try {
      await this.userService.findUserByIdError(data.id);
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
      await this.userService.findUserByIdError(data.id);
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
      await this.userService.findUserByIdError(data.id);
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
