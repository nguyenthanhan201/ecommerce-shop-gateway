import { Controller, Get } from '@nestjs/common';
import { SwaggerService } from './swagger.service';

@Controller('swagger')
export class SwaggerController {
  constructor(private readonly swaggerService: SwaggerService) {}

  @Get('generate')
  async generateSwaggerJson() {
    return await this.swaggerService.generateSwaggerJson();
  }
}
