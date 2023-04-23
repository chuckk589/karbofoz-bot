import { session } from 'grammy';
import { globalComposer } from 'src/modules/bot/global/global.composer';
import { globalModule } from 'src/modules/bot/global/global.module';
import checkTime from 'src/modules/bot/middleware/checkTime';
import i18n from 'src/modules/bot/middleware/i18n';
import { GrammyBotOptionsAsync, BaseComposer } from 'src/types/interfaces';

const options: GrammyBotOptionsAsync = {
  imports: [globalModule],
  inject: [globalComposer],
  useFactory: async (...composers: BaseComposer[]) => {
    return {
      token: process.env.BOT_TOKEN,
      middleware: [session, checkTime, i18n.middleware(), ...composers.map((c) => c.getMiddleware())],
    };
  },
};

export default options;
