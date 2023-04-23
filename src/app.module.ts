import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BotModule } from './modules/bot/bot.module';
import { LoggerModule } from 'nestjs-pino';
import * as Joi from 'joi';
import options from './configs/bot.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        BOT_TOKEN: Joi.string().required(),
      }),
    }),
    BotModule.forRootAsync(options),
    LoggerModule.forRoot({ pinoHttp: { autoLogging: false } }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
