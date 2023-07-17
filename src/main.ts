import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import rateLimit from 'express-rate-limit';
import * as swaggerDocument from './constants/swagger.json';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');

  // TODO: Có cần sử dụng helmet không
  // TODO: Có cần sử dụng csurf không nè

  app.enableCors();
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minutes
      max: 100000, // limit each IP to 100,000 requests per windowMs
    }),
  );
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  SwaggerModule.setup('swagger', app, swaggerDocument as OpenAPIObject);

  app.use((req, _, next) => {
    // console.log(`Got invoked: '${req.originalUrl}'`);
    next();
  });

  await app.listen(port || 3001, async () => {
    console.log(`Application is running on: ${await app.getUrl()}`);
  });

  // console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
