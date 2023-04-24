import { Module } from '@nestjs/common';
import { BotModule } from './modules/bot/bot.module';
import { LoggerModule } from 'nestjs-pino';
import * as Joi from 'joi';
import options from './configs/bot.config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import ORMOptionsProvider from 'src/configs/mikro-orm.config';
import { AppConfigModule } from './modules/app-config/app-config.module';
import { ConfigModule } from './modules/config/config.module';
import { PresetModule } from './modules/preset/preset.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ThemeModule } from './modules/theme/theme.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(ORMOptionsProvider),
    AppConfigModule.forRootAsync({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        BOT_TOKEN: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_URL: Joi.string().required(),
      }),
    }),
    BotModule.forRootAsync(options),
    ServeStaticModule.forRoot({ rootPath: process.env.NODE_ENV === 'dev' ? join(__dirname, '..', '/src/public/') : join(__dirname, '..', '/dist/public/') }),
    LoggerModule.forRoot({ pinoHttp: { autoLogging: false } }),
    ConfigModule,
    PresetModule,
    ThemeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
