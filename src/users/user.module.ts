import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { Telegramuser } from './entity/telegramuser.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Telegramuser])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
