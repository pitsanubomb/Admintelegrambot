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
  constructor(private readonly groupService: GroupService) {}

  @Get()
  async getAll(): Promise<any> {
    try {
      return await this.groupService.findAll();
    } catch (error) {
      throw new HttpException(
        { message: `can't Find group`, error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(`:id`)
  async getById(@Param(`id`) id: string | number) {
    try {
      return await this.groupService.findGroupById(id);
    } catch (error) {
      throw new HttpException(
        { message: `can't Find group ${id}`, error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
