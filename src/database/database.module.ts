import { Global, Module } from '@nestjs/common';

const API_KEY = '121324554';
const API_KEY_PROD = 'PROD54515';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
