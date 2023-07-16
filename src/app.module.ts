import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReverseProxyServiceMiddleware } from './proxy.service.middleware';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ReverseProxyServiceMiddleware)
      .forRoutes({ path: 'v1/service/*', method: RequestMethod.ALL });
  }
}
