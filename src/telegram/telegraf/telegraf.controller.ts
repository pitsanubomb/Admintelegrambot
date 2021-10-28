import { GroupService } from './../../groups/group.service';
import { UserService } from '../../users/user.service';
import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Get,
  Param,
  Res,
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

  @Post('channel')
  async postChannel(@Body() data: any) {
    this.telegraf.sendImageMessage(data.id, data.img, data.show, data.data);
  }

  @Post('channel/message')
  async postChannelMessage(@Body() data: any) {
    this.telegraf.sendMessage(data.id, data.message);
  }

  @Post('media')
  async postMedia(@Body() data: any,) {
    // return data;
    // res.sendFile(data.media[0].media, { root: './uploads/media' });
    // data.media[0].media = 'attach://'+data.media[0].media;
    return await this.telegraf.sendMedia(data.id, data.media);
  }

  @Post('foward/:to')
  async forwardMessage(@Body() data: any, @Param('to') to: string | number) {
    await this.telegraf.fowardMessage(to, data.from, data.mid);
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

  @Post(`group/video`)
  async postvideoDataImage(@Body() data: any) {
    await this.telegraf.getInfoChat(data.id);
    await this.groupService.findGroupById(data.id);
    return this.telegraf.sendVideo(data.id, data.video);
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

  @Post(`contact`)
  async postDataContact(@Body() data: any) {
    try {
      await this.userService.findUserByIdError(data.id);
      await this.telegraf.sendMessageGetContact(data.id, data.message);
    } catch (error) {
      throw new HttpException(
        { messsage: `ไม่สามารถส่งข้อความขอเบอร์โทรได้ได้`, error },
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

  @Post(`video`)
  async postDataVideo(@Body() data: any) {
    try {
      await this.userService.findUserByIdError(data.id);
      return this.telegraf.sendVideo(data.id, data.video);
    } catch (error) {
      throw new HttpException(
        { messsage: `ไม่สามารถส่งข้อความได้`, error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
