import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './utils/http-exception.filter';
import fastifyCookie from '@fastify/cookie';
import { join, resolve } from 'path';
import multiPart from '@fastify/multipart';
import fastifyCors from '@fastify/cors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService = app.get<ConfigService>(ConfigService);
  const origin = configService.get<string>('allowedOrigins').split(',');

  await app.register(fastifyCors, {
    origin,
    credentials: true,
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  await app.register(fastifyCookie);
  app.useStaticAssets({ root: join(resolve(), '/static/') });
  await app.register(multiPart);

  const config = new DocumentBuilder()
    .setTitle('Questly API')
    .setDescription('REST API for Questly web application')
    .setVersion('1.0')
    .build();
  const documentFactory = () => {
    return SwaggerModule.createDocument(app, config);
  };
  SwaggerModule.setup('api', app, documentFactory);

  const port = configService.get<number>('port');
  await app.listen(port ?? 3000, '0.0.0.0', () =>
    console.info(`Server is running on http://127.0.0.1:${port}`),
  );
}
void bootstrap();
