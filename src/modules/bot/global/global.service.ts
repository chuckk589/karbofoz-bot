import { Injectable } from '@nestjs/common';
import { BotContext } from 'src/types/interfaces';
// import { TelegramController } from 'src/telegram/telegram.controller';

@Injectable()
export class globalService {
  constructor() {}

  // async getUserChatIds(): Promise<string[]> {
  //   const users = await this.em.find(User, {});
  //   return users.map((user) => user.chatId);
  // }

  // async checkUserRole(from: number): Promise<boolean> {
  //   try {
  //     const user = await this.em.findOneOrFail(User, { chatId: String(from) });
  //     return user.role == UserRole.ADMIN;
  //   } catch (error) {
  //     return false;
  //   }
  // }
  // async updatePromo(from: number, id: number) {
  //   await this.em.nativeUpdate(
  //     User,
  //     { chatId: String(from) },
  //     {
  //       promo: this.em.getReference(Promo, id),
  //     },
  //   );
  // }

  // async updateUser(from: number, options: Partial<User>) {
  //   await this.em.nativeUpdate(User, { chatId: String(from) }, options);
  // }
  // async getUser(ctx: BotContext) {
  //   let user = await this.em.findOne(User, { chatId: String(ctx.from.id) });
  //   if (!user) {
  //     user = this.em.create(User, {
  //       chatId: String(ctx.from.id),
  //       username: ctx.from.username,
  //     });
  //     await this.em.persistAndFlush(user);
  //   }
  //   return wrap(user).toPOJO();
  // }
}
