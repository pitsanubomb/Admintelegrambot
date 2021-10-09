import { TelegrafService } from './../telegram/telegraf/telegraf.service';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { GroupService } from './group.service';

@Controller(`group`)
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly telegraf: TelegrafService,
  ) {}

  @Get()
  async getAll(): Promise<any> {
    try {
      return await this.groupService.findAll();
    } catch (error) {
      throw new HttpException(
        { message: `ไม่สามารถค้นหากลุ่มได้`, error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(`:id`)
  async getById(@Param(`id`) id: string | number) {
    return await this.telegraf.getInfoChat(id);
    // return await this.groupService.findGroupById(id);
  }

  @Get(`tele/:id`)
  async getByIdTele(@Param(`id`) id: string | number) {
    return await this.telegraf.getInfoChat(id);
  }
}
