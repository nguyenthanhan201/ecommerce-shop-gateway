import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAPIObject } from '@nestjs/swagger';
import { writeFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class SwaggerService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async generateSwaggerJson(): Promise<OpenAPIObject> {
    const response = await this.httpService
      .get(this.configService.get<string>('SWAGGER_URL'))
      .toPromise();

    await writeFile(
      join(process.cwd(), 'src/constants', 'swagger.json'),
      JSON.stringify(response.data),
      {
        encoding: 'utf-8',
        flag: 'w',
      },
    );

    return response.data;
  }
}
