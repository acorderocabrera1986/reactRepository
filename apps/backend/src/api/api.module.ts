import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import TodoModule from './todo/todo.module'

@Module({
  imports: [HealthModule, TodoModule],
})

export class ApiModule {}
