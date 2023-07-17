import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GlobalHttpModule } from 'src/libs/common/architecture';
import { RmqModule } from 'src/libs/common/architecture/rmq/rmq.module';
import { ReverseProxyServiceMiddleware } from '../middlewares/proxy.service.middleware';
import { AppController } from './app.controller';
import { SwaggerModule } from './swagger/swagger.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    GlobalHttpModule,
    RmqModule.register({ name: 'PRODUCT_SERVICE' }),
    SwaggerModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ReverseProxyServiceMiddleware)
      .forRoutes({ path: 'v1/service/*', method: RequestMethod.ALL });
  }
}
