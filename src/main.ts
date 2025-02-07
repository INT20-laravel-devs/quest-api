import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './utils/http-exception.filter';
import fastifyCookie from '@fastify/cookie';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.register(fastifyCookie);

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('port');
  await app.listen(port ?? 3000, () =>
    console.info(`Server is running on http://127.0.0.1:${port}`),
  );
}
void bootstrap();
