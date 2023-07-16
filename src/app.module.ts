import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { ReverseProxyServiceMiddleware } from './proxy.service.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // config for RabbitMQ
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://hchhvobc:ibuunLrTdkwzs0XMfBQRcAdUIYTJQ3nl@gerbil.rmq.cloudamqp.com/hchhvobc',
          ],
          queue: 'main_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
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
