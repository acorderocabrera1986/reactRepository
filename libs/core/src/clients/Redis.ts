import Redis from 'ioredis';

export interface IRedisProps {
  auth?: string;
  host: string;
  port: number;
}

export default class RedisPlugin {
  private redis: Redis;

  constructor(props: IRedisProps) {
    const { auth: password, ...rest } = props;

    this.redis = new Redis({
      ...rest,
      password
    });
  }

  client(): Redis {
    return this.redis;
  }
}
