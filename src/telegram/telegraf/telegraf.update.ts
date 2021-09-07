import { Update, Ctx, Start, Help, On, Hears } from 'nestjs-telegraf';
//   import { TelegrafContext } from './common/interfaces/telegraf-context.interface.ts';

@Update()
export class TelegrafUpdate {
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
    console.log(
      `___________________Have Join group Chat________________________________`,
    );
    console.log(ctx.update.message);
  }

  @On('supergroup_chat_created')
  async oneCreateAdmin(@Ctx() ctx: any) {
    console.log(
      `___________________Have Create Admin________________________________`,
      console.log(ctx),
    );
  }

  @On('left_chat_member')
  async onLeftChatMember(ctx: any) {
    console.log(
      `___________________Have User Leave Chat________________________________`,
      console.log(ctx),
    );
  }

  // @Help()
  // async help(@Ctx() ctx: TelegrafContext) {
  //   await ctx.reply('Send me a sticker');
  // }

  // @On('sticker')
  // async on(@Ctx() ctx: TelegrafContext) {
  //   await ctx.reply('👍');
  // }

  // @Hears('hi')
  // async hears(@Ctx() ctx: TelegrafContext) {
  //   await ctx.reply('Hey there');
  // }
}
