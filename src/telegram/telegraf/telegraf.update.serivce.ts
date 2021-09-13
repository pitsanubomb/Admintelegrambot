import { UserService } from '../../users/user.service';
import { Injectable } from '@nestjs/common';
import { Update, Ctx, Start, On, Hears, Command } from 'nestjs-telegraf';

@Injectable()
@Update()
export class TelegrafUpdateService {
  constructor(private readonly userService: UserService) {}

  @Start()
  async start(@Ctx() ctx: any) {
    console.log(ctx);
    await ctx.reply('Welcome');
  }

  @On('my_chat_member')
  async onMychatmem(@Ctx() ctx: any) {
    console.log(
      `___________________Event Group Chat________________________________`,
    );
    console.log(ctx);
    console.log(ctx.chat);
  }

  @On('new_chat_members')
  async onNewChat(@Ctx() ctx: any) {
    try {
      if (ctx.message.is_bot === false) {
        const id = await this.userService.findUserById(
          ctx.message.new_chat_member.id,
        );
        if (!id) {
          if (id !== ctx.message.new_chat_member.id) {
            let body = {
              id: ctx.message.new_chat_member.id,
              username: ctx.message.new_chat_member.username,
              firstname: ctx.message.new_chat_member.first_name,
              isBot: ctx.message.new_chat_member.is_bot,
            };
            await this.userService.addUser(body);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  @On('supergroup_chat_created')
  async oneCreateAdmin(@Ctx() ctx: any) {
    console.log(
      `___________________Have Create Admin________________________________`,
    );
    console.log(ctx);
  }

  @On('left_chat_member')
  async onLeftChatMember(ctx: any) {
    console.log(
      `___________________Have User Leave Chat________________________________`,
    );
    try {
      if (ctx.update.message.left_chat_member.is_bot === false) {
        const id = await this.userService.findUserById(
          ctx.update.message.left_chat_member.id,
        );
        if (!id) {
          if (id !== ctx.update.message.left_chat_member.id) {
            let body = {
              id: ctx.update.message.left_chat_member.id,
              username: ctx.update.message.left_chat_member.username,
              firstname: ctx.update.message.left_chat_member.first_name,
              isBot: ctx.update.message.left_chat_member.is_bot,
            };
            await this.userService.addUser(body);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  @Hears('hi')
  async hears(@Ctx() ctx: any) {
    await ctx.reply('Hey there');
  }

  @Command('users')
  async findList(@Ctx() ctx: any) {
    await ctx.reply('Users is ');
  }

  @On('text')
  async onText(ctx: any) {
    console.log(ctx.message.chat);
    try {
      if (ctx.message.from.is_bot === false) {
        const id = await this.userService.findUserById(ctx.message.from.id);
        if (!id) {
          if (id !== ctx.update.message.from.id) {
            let body = {
              id: ctx.update.message.from.id,
              username: ctx.update.message.from.username,
              firstname: ctx.update.message.from.first_name,
              isBot: ctx.update.message.from.is_bot,
            };
            await this.userService.addUser(body);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  @On('message')
  async onMessage(ctx: any) {
    // await ctx.reply('aaa')
    // console.log(ctx.update.message);
    console.log(
      `___________________Have Some Message________________________________`,
    );
    console.log(ctx.update);
    // console.log(ctx.update);
  }

  // @Help()
  // async help(@Ctx() ctx: TelegrafContext) {
  //   await ctx.reply('Send me a sticker');
  // }

  // @On('sticker')
  // async on(@Ctx() ctx: TelegrafContext) {
  //   await ctx.reply('👍');
  // }
}
