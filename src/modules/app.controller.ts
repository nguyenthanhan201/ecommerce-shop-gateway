import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('app')
export class AppController {
  constructor(
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  hello() {
    return this.client.emit('hello', 'Hello from rabbitmq, my name is An');
  }
}
