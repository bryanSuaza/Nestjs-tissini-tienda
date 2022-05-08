import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('TASK') private task: any,
  ) {}

  getHello(): string {
    const apiKey = this.configService.apiKey;
    const dbname = this.configService.database.name;
    return `Hello World mi apikey: ${apiKey} y mi base de datos es: ${dbname}`;
  }
}
