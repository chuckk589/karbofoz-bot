import { EntityManager, MikroORM } from '@mikro-orm/core';
import { Global, Module, DynamicModule, Provider } from '@nestjs/common';
import { ConfigModuleOptions, ConfigModule } from '@nestjs/config';
import { CONFIG_OPTIONS } from 'src/constants';
import { AppConfigService } from './app-config.service';
import { Exchange } from '../mikroorm/entities/Exchange';

@Global()
@Module({
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {
  constructor(private readonly em: EntityManager) {}
  public static async forRootAsync(options: ConfigModuleOptions): Promise<DynamicModule> {
    const ConfigProvider: Provider = {
      provide: CONFIG_OPTIONS,
      useFactory: async (orm: MikroORM) => {
        // const exchanges = await orm.em.find(Exchange, {});
        // Reflect.defineMetadata(
        //   'exchanges',
        //   exchanges.map((exchange) => exchange.name),
        //   AppConfigService,
        // );
        return {};
      },
      inject: [MikroORM],
    };
    return {
      module: AppConfigModule,
      imports: [ConfigModule.forRoot(options)],
      providers: [ConfigProvider],
      exports: [ConfigModule],
    };
  }
}
