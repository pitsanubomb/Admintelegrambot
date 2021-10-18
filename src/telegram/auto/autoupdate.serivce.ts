import { ChannelService } from './../../channel/channel.service';
import { UserService } from '../../users/user.service';
import { Injectable } from '@nestjs/common';
import {
  Update,
  Ctx,
  Start,
  On,
  Hears,
  Command,
  InjectBot,
} from 'nestjs-telegraf';
import { Markup, Telegraf } from 'telegraf';
import { GroupService } from 'src/groups/group.service';

@Injectable()
@Update()
export class AutoUpdateService {
  constructor(
    @InjectBot() private bot: Telegraf<any>,
    private readonly userService: UserService,
    private readonly groupService: GroupService,
    private readonly channelService: ChannelService,
  ) {}

  @Start()
  async start(@Ctx() ctx: any) {
    const botName = ctx.botInfo.username;
    const text = `สวัสดีคะ ฉันชื่อ${ctx.botInfo.first_name} มีหน้าที่ช่วยจัดการกลุ่มและส่งข้อความ กรุณา คลิก Add เพื่อให้${ctx.botInfo.first_name} สามารถจัดการได้`;

    if (
      ctx.message.chat.type !== 'group' &&
      ctx.message.chat.type !== 'supergroup'
    ) {
      await ctx.reply(
        `${text}`,
        Markup.inlineKeyboard([
          Markup.button.url(
            `Add ${ctx.botInfo.first_name} to group 🔥`,
            `https://t.me/${botName}?startgroup=true`,
          ),
        ]),
      );
    } else {
      await ctx.reply(`ข้อความจากระบบ ที่ตั้ง`);
      if (ctx.message.text !== `/start`) {
        try {
          const groupId = await this.groupService.findGroupById(
            ctx.message.chat.id,
          );
          if (!groupId) {
            let body = {
              id: ctx.message.chat.id,
              groupname: ctx.message.chat.title,
              grouptype: ctx.message.chat.type,
              isAdminmember:
                ctx.message.chat.all_members_are_administrators || false,
            };
            await this.groupService.addGroup(body);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  @On('my_chat_member')
  async onMychatmem(@Ctx() ctx: any) {
    console.log(
      `___________________Event Chat________________________________`,
    );
    // console.log(ctx);
    console.log(ctx.update.my_chat_member);
    const { id, title, type } = ctx.update.my_chat_member.chat;
    const findId = await this.channelService.findChannelById(id);

    if (!findId && type === `channel`) {
      const body = {
        id: id,
        title: title,
      };
      await this.channelService.addChannel(body);
    }
  }

  @On('new_chat_members')
  async onNewChat(@Ctx() ctx: any) {
    console.log(`${ctx} And Have Join . . .`);
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
      } else {
        try {
          const groupId = await this.groupService.findGroupById(
            ctx.message.chat.id,
          );
          if (!groupId) {
            let body = {
              id: ctx.message.chat.id,
              groupname: ctx.message.chat.title,
              grouptype: ctx.message.chat.type,
              isAdminmember:
                ctx.message.chat.all_members_are_administrators || false,
            };

            await this.groupService.addGroup(body);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  @On('group_chat_created')
  async onGroupChatCreated(@Ctx() ctx: any) {
    try {
      const groupId = await this.groupService.findGroupById(
        ctx.message.chat.id,
      );
      if (!groupId) {
        let body = {
          id: ctx.message.chat.id,
          groupname: ctx.message.chat.title,
          grouptype: ctx.message.chat.type,
          isAdminmember:
            ctx.message.chat.all_members_are_administrators || false,
        };

        await this.groupService.addGroup(body);
      }
    } catch (error) {
      console.log(error);
    }
  }

  @On('left_chat_member')
  async onLeftChatMember(ctx: any) {
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
      } else {
        console.log(ctx.update.message);
        // await this.groupService.removeGroup(ctx.update.message.left_chat_member.id)
      }
    } catch (error) {
      console.log(error);
    }
  }

  @On('migrate_to_chat_id')
  async migrateFromChat(ctx: any) {
    console.log(ctx.update.message);
    try {
      await this.groupService.findAndEditId(
        ctx.update.message.chat.id,
        ctx.update.message.migrate_to_chat_id,
      );
    } catch (error) {}
  }

  @On('new_chat_title')
  async onnewChatTitle(ctx: any) {
    // console.log(ctx.update);
    const t = await this.groupService.findAndEdit(
      ctx.update.message.chat.id,
      ctx.update.message.new_chat_title,
    );
  }

  @On('channel_post')
  async onchannelPost(@Ctx() ctx: any) {
    console.log(`______Chanel Have some . . .__________`);
    console.log(ctx.update);
  }

  @On('channel_chat_created')
  async oneChanelcrate(@Ctx() ctx: any) {
    console.log(`_________Chanal with some . . .________`);
    console.log(ctx);
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
    console.log('Have some text . . .');

    // console.log(ctx.update.message);
    try {
      const user = await this.bot.telegram.getChatMember(
        ctx.message.chat.id,
        ctx.message.from.id,
      );

      if (user.status === 'member') {
        try {
          await this.bot.telegram.deleteMessage(
            ctx.message.chat.id,
            ctx.message.message_id,
          );
        } catch (error) {
          ctx.reply(
            `Error ไม่สามารถลบข้อความได้ กรุณาให้สิทธิ์ Admin กับฉันด้วยคะ`,
          );
        }

        try {
        } catch (error) {
          ctx.reply(
            `Error ไม่สามารถใบ้ x User ไม่ให้ส่งข้อความได้ กรุณาให้สิทธิ์ Admin กับฉันด้วยคะ`,
          );
        }

        await this.bot.telegram.restrictChatMember(
          ctx.message.chat.id,
          ctx.message.from.id,
          {
            permissions: {
              can_send_messages: false,
              can_send_media_messages: false,
              can_add_web_page_previews: false,
              can_send_other_messages: false,
              can_change_info: false,
              can_invite_users: false,
              can_pin_messages: false,
              can_send_polls: false,
            },
          },
        );
      }
    } catch (e) {
      console.log(e.response);
    }
    try {
      if (ctx.update.message.from.is_bot === false) {
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
    if (ctx.message.contact) {
      const phoneNo = ctx.update.message.contact.phone_number;
      const userId = ctx.update.message.contact.user_id;
      await this.userService.findAndEditPhone(userId, phoneNo);
    }
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
