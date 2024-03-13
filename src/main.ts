import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { config } from 'dotenv';

// configure environment variables
config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'log', 'warn', 'verbose'],
    rawBody: true,
  });

  app.enableCors({
    origin: [/[^?.]localhost:(?:\d{2,5})$/, /[^?.]\.api.fillout.com$/],
  });

  await app.listen(3000);
}
bootstrap();
