import { Menu } from '@grammyjs/menu';
import { InputFile, Keyboard } from 'grammy';
import { BaseComposer, BotContext, BotStep } from 'src/types/interfaces';
import { Command, ComposerController, On, Use } from '../common/decorators';
import { label } from '../common/helpers';
import { globalService } from './global.service';
import { Router } from '@grammyjs/router';
import { mainKeyboard } from '../common/keyboards';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import i18n from '../middleware/i18n';
import { AppConfigService } from 'src/modules/app-config/app-config.service';

@ComposerController
export class globalComposer extends BaseComposer {
  constructor() {
    super();
  }

  @Command('start')
  start = async (ctx: BotContext) => {
    ctx.reply('Hello');
  };
}
