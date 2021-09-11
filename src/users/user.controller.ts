import { UserService } from './user.service';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    try {
      return await this.userService.getAllUsers();
    } catch (error) {
      throw new HttpException(
        { message: 'ไม่สามารถค้นหาข้อมูลได้', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  async getChat(@Param(`id`) id: number) {
    return await this.userService.findUserById(id);
  }
}
