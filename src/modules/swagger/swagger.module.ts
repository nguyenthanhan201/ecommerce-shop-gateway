import { Module } from '@nestjs/common';
import { SwaggerController } from './swagger.controller';
import { SwaggerService } from './swagger.service';

@Module({
  providers: [SwaggerService],
  controllers: [SwaggerController],
})
export class SwaggerModule {}
