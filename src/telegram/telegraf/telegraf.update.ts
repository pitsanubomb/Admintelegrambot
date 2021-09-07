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
    console.log(ctx.chat);
  }

  @On('new_chat_members')
  async onNewChat(@Ctx() ctx: any) {
    console.log(ctx.update.message);
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
