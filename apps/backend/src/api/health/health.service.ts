import { Injectable } from '@nestjs/common';
import RedisClient from '../../client/RedisClient';

@Injectable()
export class HealthService {
  async ping(): Promise<string> {
    await RedisClient.set('id1', Date.now());
    return await RedisClient.get('id1');
  }

  async health(): Promise<{ [key: string]: string }> {
    return {
      status: "UP"
    }
  }
}

export default HealthService;
