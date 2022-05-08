import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    //@Inject('API_KEY') private apiKey: string,
    //private configService: ConfigService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('TASK') private task: any,
  ) {}

  getHello(): string {
    //console.log(this.task);
    //const apiKey = this.configService.get('API_KEY');
    const apiKey = this.configService.apiKey;
    //const dbname = this.configService.get('DATABASE_NAME');
    const dbname = this.configService.database.name;
    return `Hello World mi apikey: ${apiKey} y mi base de datos es: ${dbname}`;
  }
}
