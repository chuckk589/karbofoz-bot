import { session as session_ } from 'grammy';
import { Session, BotContext, BotStep } from 'src/types/interfaces';

const initial = (): Session => ({
  menuId: undefined,
  step: BotStep.default,
});

function getSessionKey(ctx: BotContext): string | undefined {
  return ctx.from?.id.toString();
}

export const session = session_({
  initial: initial,
  getSessionKey: getSessionKey,
});
