import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ApiModule } from './api/api.module';

 async function bootstrap() {
   const app = await NestFactory.create(ApiModule);
   const port = 8080;

   app.enableCors();
 
   await app.listen(port);
 
   Logger.log(`🚀 Api is running on: http://localhost:${port}`);
 }
 
 bootstrap();
 