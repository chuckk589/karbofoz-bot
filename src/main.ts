import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerErrorInterceptor } from 'nestjs-pino';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppConfigService } from './modules/app-config/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  const configService = app.get(AppConfigService);
  await app.listen(configService.get('port'));
}
bootstrap();
